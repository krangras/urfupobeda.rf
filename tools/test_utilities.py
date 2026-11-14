"""Regression checks for the local server and PDF option, without OCR dependencies."""
import contextlib
import importlib.util
import io
import os
from pathlib import Path
import subprocess
import sys
import tempfile
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent.parent


def test_server_shutdown():
    # Deliver SIGINT inside the actual main-thread server loop, on a random port.
    code = '''
import http.server, os, runpy, signal
os.environ['PORT']='0'
os.environ['BIND']='127.0.0.1'
def interrupt(server):
    if not getattr(server, '_tested', False):
        server._tested=True
        signal.raise_signal(signal.SIGINT)
http.server.ThreadingHTTPServer.service_actions=interrupt
runpy.run_path('server.py', run_name='__main__')
'''
    result = subprocess.run([sys.executable, '-c', code], cwd=ROOT,
                            capture_output=True, text=True, timeout=5)
    assert result.returncode == 0, result.stderr
    assert 'Shutting down' in result.stdout


def test_pdf_option():
    spec = importlib.util.spec_from_file_location('parse_pdf', ROOT / 'tools/parse_pdf.py')
    parser = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(parser)
    class Image:
        def save(self, *_):
            pass
    for disabled in [True, False]:
        with tempfile.TemporaryDirectory(prefix='urfupobeda-pdf-test-') as folder:
            source = Path(folder) / 'input.pdf'
            source.write_bytes(b'%PDF-test')
            args = ['parse_pdf.py', str(source), '--output', str(Path(folder) / 'out'), '--mode', 'tasks']
            if disabled:
                args.append('--no-formulas')
            with patch.object(parser, 'HAS_PIL', True), \
                 patch.object(parser, 'extract_pages', return_value=[{'index': 0, 'image': Image()}]), \
                 patch.object(parser, 'detect_formula_regions', return_value=[(1, 2, 3, 4)]) as detect, \
                 patch.object(parser, 'extract_formula_images', return_value=[{'file': 'f.png'}]) as extract, \
                 patch.object(sys, 'argv', args), contextlib.redirect_stdout(io.StringIO()):
                parser.main()
            assert detect.call_count == (0 if disabled else 1)
            assert extract.call_count == (0 if disabled else 1)


if __name__ == '__main__':
    test_server_shutdown()
    test_pdf_option()
    print('PASS: actual server SIGINT shutdown; PDF --no-formulas; single formula extraction')
