# Перенос urfupobeda.rf на GitHub Pages

Патч рассчитан на текущую структуру репозитория `krangras/urfupobeda.rf`.

Он делает три вещи:

1. заменяет SSH/Docker workflow `.github/workflows/deploy.yaml` на GitHub Pages workflow;
2. делает Service Worker совместимым и с `https://krangras.github.io/urfupobeda.rf/`, и с корневым custom domain;
3. собирает `_site` на каждом push в `main` и публикует его через официальный GitHub Pages artifact flow.

## Применение на Windows

Распакуйте папку рядом/в любое место, откройте PowerShell в корне клона `urfupobeda.rf` и выполните:

```powershell
& "ПУТЬ_К_ПАТЧУ\apply-pages.ps1"
git diff --check
git diff
git add index.html sw.js .github/workflows/deploy.yaml
git commit -m "deploy: migrate site to GitHub Pages"
git push origin main
```

## Один раз в GitHub

`Repository -> Settings -> Pages -> Build and deployment -> Source -> GitHub Actions`

После успешного workflow сайт будет доступен по адресу:

`https://krangras.github.io/urfupobeda.rf/`

Если позже нужен собственный домен `urfupobeda.rf`, его надо отдельно настроить в `Settings -> Pages -> Custom domain` и DNS. Сам патч уже совместим с обоими вариантами.
