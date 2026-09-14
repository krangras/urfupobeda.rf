// typeConfig + existingSolutions + krTaskSolutions
const typeConfig = [
        {
            num: 1, title: 'Метод вариации произвольных постоянных',
            desc: 'для любых ЛДУ, особенно когда метод неопределённых коэффициентов неприменим (правая часть не спецвида).',
            points: 30,
            tasks: [
                { cond: "Решить уравнение: $$ y'' + 4y = \\frac{8}{\\cos^2 x} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{1}{\\cos x} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{1}{\\sin x} $$" },
                { cond: "Решить уравнение: $$ y'' + 4y = 2\\operatorname{tg} x $$" },
                { cond: "Решить уравнение: $$ y'' - 2y' + y = \\frac{e^x}{x} $$" },
                { cond: "Решить уравнение: $$ y'' + 3y' + 2y = \\frac{1}{e^x + 1} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{2}{\\cos^3 x} $$" },
                { cond: "Решить уравнение: $$ y'' - y' = \\frac{e^{2x}}{e^x + 1} $$" },
                { cond: "Решить уравнение: $$ y'' + 2y' + y = \\frac{e^{-x}}{x^2} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{1}{\\sin^3 x} $$" }
            ]
        },
        {
            num: 2, title: 'Метод неопределённых коэффициентов',
            desc: 'правая часть спецвида: $e^{\\alpha x}(P_n(x)\\cos\\beta x + Q_m(x)\\sin\\beta x)$.',
            points: 30,
            tasks: [
                { cond: "Решить уравнение: $$ y'' - 3y' + 2y = 52\\cos 3x $$" },
                { cond: "Решить уравнение: $$ y'' - 2y' - 3y = e^{4x} $$" },
                { cond: "Решить уравнение: $$ y'' + y = 4\\sin x $$" },
                { cond: "Решить уравнение: $$ y'' - 5y' + 4y = 4x^2 e^{2x} $$" },
                { cond: "Решить уравнение: $$ y'' - 2y' + y = 6x e^x $$" },
                { cond: "Решить уравнение: $$ y'' + y = 4x e^x $$" },
                { cond: "Решить уравнение: $$ y'' + 4y' + 4y = x e^{2x} $$" },
                { cond: "Решить уравнение: $$ y'' + 9y = \\cos 3x $$" },
                { cond: "Решить уравнение: $$ y'' - 4y' + 8y = e^{2x} + \\sin 2x $$" },
                { cond: "Решить уравнение: $$ y'' - 5y' = 3x^2 $$" }
            ]
        },
        {
            num: 3, title: 'Задача Коши (метод вариации)',
            desc: 'находим общее решение НЛДУ → подставляем начальные условия → находим константы.',
            points: 40,
            tasks: [
                { cond: "Решить задачу Коши: $$ y'' + 2y' + y = 3e^{-x}\\sqrt{x+1};\\; y(0) = \\frac{4}{5};\\; y'(0) = 2 $$" }, // Демо-задача восстановлена
                { cond: "Решить задачу Коши: $$ y'' + 4y = \\frac{1}{\\sin 2x};\\; y(\\frac{\\pi}{4}) = 1;\\; y'(\\frac{\\pi}{4}) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + y = \\frac{1}{\\sin^2 x};\\; y(\\frac{\\pi}{2}) = 0;\\; y'(\\frac{\\pi}{2}) = 1 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 2y' + y = \\frac{e^{-x}}{x+1};\\; y(0) = 1;\\; y'(0) = -1 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 9y = \\frac{1}{\\cos 3x};\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - y' = \\frac{e^x}{e^x + 2};\\; y(0) = \\ln 3;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + y = \\operatorname{ctg} x;\\; y(\\frac{\\pi}{2}) = 0;\\; y'(\\frac{\\pi}{2}) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 2y' + y = e^x \\ln x;\\; y(1) = 1;\\; y'(1) = 1 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 4y = \\operatorname{tg} 2x;\\; y(0) = 0;\\; y'(0) = 2 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 3y' + 2y = \\frac{e^{-x}}{e^x + 2};\\; y(0) = 0;\\; y'(0) = 0 $$" }
            ]
        },
        {
            num: 4, title: 'Задача Коши (метод неопределённых коэффициентов)',
            desc: 'находим общее решение НЛДУ → подставляем начальные условия → находим константы.',
            points: 40,
            tasks: [
                { cond: "Решить задачу Коши: $$ y'' - 2y' + 2y = 4e^x\\cos x;\\; y(\\pi) = \\pi e^\\pi;\\; y'(\\pi) = e^\\pi $$" }, // Демо-задача восстановлена
                { cond: "Решить задачу Коши: $$ y'' + 4y = 8\\sin 2x;\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 2y' + 5y = 10x^2;\\; y(0) = 0;\\; y'(0) = 1 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 2y' = 4x e^{-2x};\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 6y' + 9y = 2e^{3x};\\; y(0) = 1;\\; y'(0) = 3 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 16y = 8\\cos 4x;\\; y(0) = 0;\\; y'(0) = 4 $$" },
                { cond: "Решить задачу Коши: $$ y'' - y = 4x e^x;\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 4y' + 5y = e^{2x}\\sin x;\\; y(0) = 1;\\; y'(0) = 2 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 6y' + 9y = 18x;\\; y(0) = 1;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 4y' = 16x;\\; y(0) = 0;\\; y'(0) = -4 $$" }
            ]
        }
    ];


const existingSolutions = [
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ y'' + 4y = 0 $$
                            $$ \\lambda^2 + 4 = 0 \\implies \\lambda^2 = -4 \\implies \\lambda_{1,2} = \\pm 2i $$
                            ФСР: $$ \\cos 2x \\text{, } \\sin 2x $$
                            $$ y_{о.о.} = C_1 \\cos 2x + C_2 \\sin 2x $$
                            <br>Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):<br>
                            $$ y_{о.н.} = C_1(x) \\cos 2x + C_2(x) \\sin 2x $$
                            $$ \\begin{cases} \\cos 2x \\cdot C_1' + \\sin 2x \\cdot C_2' = 0 \\\\ -2 \\sin 2x \\cdot C_1' + 2 \\cos 2x \\cdot C_2' = \\frac{8}{\\cos^2 x} \\end{cases} $$
                            <br>Считаем определители:
                            $$ \\begin{aligned} \\Delta &= \\begin{vmatrix} \\cos 2x & \\sin 2x \\\\ -2 \\sin 2x & 2 \\cos 2x \\end{vmatrix} = 2 \\cos^2 2x + 2 \\sin^2 2x = 2 \\\\ \\Delta_1 &= \\begin{vmatrix} 0 & \\sin 2x \\\\ \\frac{8}{\\cos^2 x} & 2 \\cos 2x \\end{vmatrix} = - \\frac{8 \\sin 2x}{\\cos^2 x} = - \\frac{16 \\sin x \\cos x}{\\cos^2 x} = -16 \\frac{\\sin x}{\\cos x} \\\\ \\Delta_2 &= \\begin{vmatrix} \\cos 2x & 0 \\\\ -2 \\sin 2x & \\frac{8}{\\cos^2 x} \\end{vmatrix} = \\frac{8 \\cos 2x}{\\cos^2 x} = \\frac{8(2\\cos^2 x - 1)}{\\cos^2 x} = \\frac{16 \\cos^2 x - 8}{\\cos^2 x} = 16 - \\frac{8}{\\cos^2 x} \\end{aligned} $$
                            <br>Находим производные:
                            $$ C_1' = \\frac{\\Delta_1}{\\Delta} = - 8 \\frac{\\sin x}{\\cos x} \\qquad C_2' = \\frac{\\Delta_2}{\\Delta} = 8 - \\frac{4}{\\cos^2 x} $$
                            <br>Интегрируем:
                            $$ C_1 = -8 \\int \\frac{\\sin x}{\\cos x} dx = \\left[ \\begin{smallmatrix} \\cos x = t \\\\ dt = -\\sin x dx \\\\ -dt = \\sin x dx \\end{smallmatrix} \\right] = 8 \\int \\frac{dt}{t} = 8 \\ln|t| + D_1 = 8 \\ln|\\cos x| + D_1 $$
                            $$ C_2 = \\int \\left( 8 - \\frac{4}{\\cos^2 x} \\right) dx = 8x - 4 \\operatorname{tg} x + D_2 $$
                            <br><strong>Ответ:</strong>
                            $$ y_{о.н.} = (8 \\ln|\\cos x| + D_1) \\cos 2x + (8x - 4 \\operatorname{tg} x + D_2) \\sin 2x $$
                        `,
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ \\lambda^2 - 3 \\lambda + 2 = 0 $$
                            $$ \\mathcal{D} = 9 - 8 = 1 \\implies \\lambda_{1,2} = \\frac{3 \\pm 1}{2} \\implies \\lambda_1 = 1, \\ \\lambda_2 = 2 $$
                            ФСР: $$ e^x \\text{, } e^{2x} $$
                            $$ y_{о.о.} = C_1 e^x + C_2 e^{2x} $$
                            <br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
                            $$ F(x) = 52 \\cos 3x = e^{0 \\cdot x} \\cdot (52 \\cos 3x + 0 \\cdot \\sin 3x) $$
                            $$ \\alpha = 0, \\ \\beta = 3, \\ P(x) = 52, \\ Q(x) = 0 \\implies \\alpha + \\beta i = 3i \\implies S = 0 $$
                            $$ \\deg(R) = \\deg(T) = \\max(\\deg(P), \\deg(Q)) = 0 \\implies R(x) = A, \\ T(x) = B $$
                            $$ y_{ч.н.} = x^0 \\cdot e^{0 \\cdot x} \\cdot (A \\cos 3x + B \\sin 3x) = A \\cos 3x + B \\sin 3x $$
                            <br>Находим производные для подстановки:
                            $$ y'_{ч.н.} = -3A \\sin 3x + 3B \\cos 3x $$
                            $$ y''_{ч.н.} = -9A \\cos 3x - 9B \\sin 3x $$
                            <br>Подставляем в исходное уравнение:
                            $$ -9A \\cos 3x - 9B \\sin 3x - 3(-3A \\sin 3x + 3B \\cos 3x) + 2(A \\cos 3x + B \\sin 3x) = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            $$ -9A \\cos 3x - 9B \\sin 3x + 9A \\sin 3x - 9B \\cos 3x + 2A \\cos 3x + 2B \\sin 3x = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            <br>Группируем слагаемые:
                            $$ (-9A - 9B + 2A) \\cos 3x + (-9B + 9A + 2B) \\sin 3x = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            $$ (-7A - 9B) \\cos 3x + (9A - 7B) \\sin 3x = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            <br>Составляем систему уравнений:
                            $$ \\begin{cases} -7A - 9B = 52 \\\\ 9A - 7B = 0 \\end{cases} \\Leftrightarrow \\begin{cases} -63A - 81B = 468 \\\\ 63A - 49B = 0 \\end{cases} \\text{ } \\Bigg| + $$
                            <br>Сложив уравнения, получаем:
                            $$ -130B = 468 \\implies B = -\\frac{18}{5} \\implies A = -\\frac{14}{5} $$
                            $$ y_{ч.н.} = -\\frac{14}{5} \\cos 3x - \\frac{18}{5} \\sin 3x $$
                            <br><strong>Ответ:</strong>
                            $$ y_{о.н.} = C_1 e^x + C_2 e^{2x} - \\frac{1}{5}(14\\cos 3x + 18\\sin 3x) $$
                        `,
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ y'' + 2y' + y = 0 \\implies \\lambda^2 + 2\\lambda + 1 = 0 \\implies (\\lambda + 1)^2 = 0 \\implies \\lambda_{1,2} = -1 $$
                            ФСР: $$ e^{-x} \\text{, } x e^{-x} $$
                            $$ y_{о.о.} = C_1 e^{-x} + C_2 x e^{-x} $$
                            <br>Возвращаемся к НЛДУ (Метод вариации):
                            $$ y_{о.н.} = C_1(x) e^{-x} + C_2(x) x e^{-x} $$
                            $$ \\begin{cases} e^{-x} \\cdot C_1' + x e^{-x} \\cdot C_2' = 0 \\\\ -e^{-x} \\cdot C_1' + e^{-x} \\cdot C_2' - x e^{-x} \\cdot C_2' = 3e^{-x}\\sqrt{x+1} \\end{cases} \\quad \\Bigg| + $$
                            <br>Складываем уравнения:
                            $$ e^{-x} \\cdot C_2' = 3e^{-x}\\sqrt{x+1} \\implies C_2' = 3\\sqrt{x+1} $$
                            $$ C_2 = 3\\int \\sqrt{x+1}\\,dx = 2(x+1)^{\\frac{3}{2}} + D_2 $$
                            <br>Из первого уравнения находим $C_1'$: $$ e^{-x} \\cdot C_1' + x e^{-x} \\cdot 3\\sqrt{x+1} = 0 \\implies C_1' = -3x\\sqrt{x+1} $$
                            $$ C_1 = -3\\int x\\sqrt{x+1}\\,dx = -\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}} + D_1 $$
                            <br>Общее решение:
                            $$ y_{о.н.} = \\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}} + D_1\\right) e^{-x} + \\left(2(x+1)^{\\frac{3}{2}} + D_2\\right)x e^{-x} $$
                            <br>Подставляем начальные условия задачи Коши:
                            $$ y(0) = \\frac{4}{5} \\implies \\left(-\\frac{6}{5} + 2 + D_1\\right) = \\frac{4}{5} \\implies D_1 = 0 $$
                            <br>Находим $y'_{о.н.}$:
                            $$ y'_{о.н.} = \\left(-3(x+1)^{\\frac{3}{2}} + 3(x+1)^{\\frac{1}{2}}\\right)e^{-x} - \\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}}\\right)e^{-x} + \\left(3x(x+1)^{\\frac{1}{2}} + 2(x+1)^{\\frac{3}{2}} + D_2\\right)e^{-x} - \\left(2(x+1)^{\\frac{3}{2}} + D_2\\right)xe^{-x} $$
                            $$ y'(0) = 2 \\implies ( -3 + 3 ) - \\left( -\\frac{6}{5} + 2 \\right) + (0 + 2 + D_2) = 2 \\implies -\\frac{4}{5} + 2 + D_2 = 2 \\implies D_2 = \\frac{4}{5} $$
                            <br>Собираем функцию и упрощаем:
                            $$ y = \\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}}\\right) e^{-x} + \\left(2(x+1)^{\\frac{3}{2}} + \\frac{4}{5}\\right)x e^{-x} = \\frac{4}{5}e^{-x}\\left(x + (x+1)^{\\frac{5}{2}}\\right) $$
                            <br><strong>Ответ:</strong>
                            $$ y = \\frac{4}{5}e^{-x}\\left(x + (x+1)^{\\frac{5}{2}}\\right) $$
                        `,
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ \\lambda^2 - 2\\lambda + 2 = 0 \\implies \\mathcal{D} = 4 - 8 = -4 \\implies \\lambda_{1,2} = \\frac{2 \\pm 2i}{2} = 1 \\pm i $$
                            ФСР: $$ e^x\\cos x \\text{, } e^x\\sin x $$
                            $$ y_{о.о.} = C_1 e^x\\cos x + C_2 e^x\\sin x $$
                            <br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
                            $$ F(x) = 4e^x\\cos x = e^{1 \\cdot x}(4\\cos x + 0\\sin x) $$
                            $$ \\alpha = 1, \\ \\beta = 1, \\ P(x) = 4, \\ Q(x) = 0 \\implies \\alpha + \\beta i = 1 + i \\implies S = 1 \\text{ (резонанс)} $$
                            $$ \\deg(R) = \\deg(T) = \\max(\\deg(P), \\deg(Q)) = 0 \\implies R(x) = A, \\ T(x) = B $$
                            $$ y_{ч.н.} = x^1 \\cdot e^x(A\\cos x + B\\sin x) = xe^x(A\\cos x + B\\sin x) $$
                            <br>Считаем производные:
                            $$ y'_{ч.н.} = e^x(A\\cos x + B\\sin x) + xe^x(A\\cos x + B\\sin x) + xe^x(-A\\sin x + B\\cos x) $$
                            $$ \\begin{aligned} y''_{ч.н.} &= e^x(A\\cos x + B\\sin x) + e^x(-A\\sin x + B\\cos x) + e^x(A\\cos x + B\\sin x) + xe^x(A\\cos x + B\\sin x) \\\\ &\\quad + xe^x(-A\\sin x + B\\cos x) + e^x(-A\\sin x + B\\cos x) + xe^x(-A\\sin x + B\\cos x) + xe^x(-A\\cos x - B\\sin x) \\\\ &= 2e^x(A\\cos x + B\\sin x) + 2e^x(-A\\sin x + B\\cos x) + 2xe^x(-A\\sin x + B\\cos x) \\end{aligned} $$
                            <br>Подставляем всё в уравнение $y'' - 2y' + 2y = 4e^x\\cos x$:
                            $$ \\begin{aligned} &\\cancel{2e^x(A\\cos x + B\\sin x)} + 2e^x(-A\\sin x + B\\cos x) + \\cancel{2xe^x(-A\\sin x + B\\cos x)} \\\\ &- \\cancel{2e^x(A\\cos x + B\\sin x)} - \\cancel{2xe^x(A\\cos x + B\\sin x)} - \\cancel{2xe^x(-A\\sin x + B\\cos x)} \\\\ &+ \\cancel{2xe^x(A\\cos x + B\\sin x)} = 4e^x\\cos x \\end{aligned} $$
                            $$ 2e^x(-A\\sin x + B\\cos x) = 4e^x\\cos x \\implies -A\\sin x + B\\cos x = 0 \\cdot \\sin x + 2\\cos x $$
                            $$ \\begin{cases} -A = 0 \\\\ B = 2 \\end{cases} \\Leftrightarrow \\begin{cases} A = 0 \\\\ B = 2 \\end{cases} $$
                            $$ y_{ч.н.} = xe^x(0 \\cdot \\cos x + 2\\sin x) = 2xe^x\\sin x $$
                            <br>Общее решение:
                            $$ y_{о.н.} = C_1 e^x\\cos x + C_2 e^x\\sin x + 2xe^x\\sin x $$
                            <br>Подставляем начальные условия задачи Коши:
                            $$ y(\\pi) = \\pi e^\\pi \\implies y_{о.н.}(\\pi) = C_1 e^\\pi \\cos \\pi + C_2 e^\\pi \\sin \\pi + 2\\pi e^\\pi \\sin \\pi = C_1 e^\\pi \\cdot (-1) = -C_1 e^\\pi = \\pi e^\\pi \\implies C_1 = -\\pi $$
                            <br>Находим $y'_{о.н.}$:
                            $$ y'_{о.н.} = C_1 e^x\\cos x - C_1 e^x\\sin x + C_2 e^x\\sin x + C_2 e^x\\cos x + 2e^x\\sin x + 2xe^x\\sin x + 2xe^x\\cos x $$
                            $$ y'(\\pi) = e^\\pi \\implies y'_{о.н.}(\\pi) = -C_1 e^\\pi - C_2 e^\\pi - 2\\pi e^\\pi = e^\\pi $$
                            $$ \\pi - C_2 - 2\\pi = 1 \\implies -\\pi - C_2 = 1 \\implies C_2 = -\\pi - 1 $$
                            <br>Собираем итоговое решение:
                            $$ \\begin{aligned} y &= -\\pi \\cdot e^x\\cos x - (\\pi + 1)e^x\\sin x + 2xe^x\\sin x \\\\ &= e^x(-\\pi\\cos x - (\\pi + 1)\\sin x + 2x\\sin x) \\\\ &= e^x((2x - \\pi - 1)\\sin x - \\pi\\cos x) \\end{aligned} $$
                            <br><strong>Ответ:</strong>
                            $$ y = e^x((2x - \\pi - 1)\\sin x - \\pi\\cos x) $$
                        `
    ];

const krTaskSolutions = [
[
        null,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \frac{1}{\cos x} \end{cases} $$<br>
Считаем определители:
$$ \Delta = \begin{vmatrix} \cos x & \sin x \\ -\sin x & \cos x \end{vmatrix} = 1 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin x \\ \frac{1}{\cos x} & \cos x \end{vmatrix} = -\tg x $$
$$ \Delta_2 = \begin{vmatrix} \cos x & 0 \\ -\sin x & \frac{1}{\cos x} \end{vmatrix} = 1 $$<br>
Находим производные и интегрируем:
$$ C_1' = -\tg x \implies C_1 = \ln|\cos x| + D_1 $$
$$ C_2' = 1 \implies C_2 = x + D_2 $$<br>
Сборка решения:
$$ y_{о.н.} = (ln|\cos x| + D_1)\cos x + (x + D_2)\sin x $$
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \cos x + D_2 \sin x + \cos x \ln|\cos x| + x \sin x $$`,

        `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 1 = 0 \\implies \\lambda_{1,2} = \\pm i $$<br>
ФСР: $$ \\cos x,\\; \\sin x $$
$$ y_{о.о.} = C_1 \\cos x + C_2 \\sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos x \\cdot C_1' + \\sin x \\cdot C_2' = 0 \\\\ -\\sin x \\cdot C_1' + \\cos x \\cdot C_2' = \\frac{1}{\\sin x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} \\cos x & \\sin x \\\\ -\\sin x & \\cos x \\end{vmatrix} = 1 $$
$$ \\Delta_1 = \\begin{vmatrix} 0 & \\sin x \\\\ \\frac{1}{\\sin x} & \\cos x \\end{vmatrix} = -1 $$
$$ \\Delta_2 = \\begin{vmatrix} \\cos x & 0 \\\\ -\\sin x & \\frac{1}{\\sin x} \\end{vmatrix} = \\ctg x $$<br>
$$ C_1' = -1 \\implies C_1 = \\int -1\\,dx = -x + D_1 $$
$$ C_2' = \\ctg x \\implies C_2 = \\int \\frac{\\cos x}{\\sin x}\\,dx = \\ln|\\sin x| + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \\cos x + D_2 \\sin x - x \\cos x + \\sin x \\cdot \\ln|\\sin x| $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 4y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 4 = 0 \\implies \\lambda_{1,2} = \\pm 2i $$<br>
ФСР: $$ \\cos 2x,\\; \\sin 2x $$
$$ y_{о.о.} = C_1 \\cos 2x + C_2 \\sin 2x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos 2x \\cdot C_1' + \\sin 2x \\cdot C_2' = 0 \\\\ -2\\sin 2x \\cdot C_1' + 2\\cos 2x \\cdot C_2' = 2\\tg x \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} \\cos 2x & \\sin 2x \\\\ -2\\sin 2x & 2\\cos 2x \\end{vmatrix} = 2\\cos^2 2x + 2\\sin^2 2x = 2 $$
$$ \\Delta_1 = -2\\tg x \\sin 2x = -2\\cdot\\frac{\\sin x}{\\cos x}\\cdot 2\\sin x\\cos x = -4\\sin^2 x = -2(1-\\cos 2x) $$
$$ \\Delta_2 = 2\\tg x \\cos 2x = 2\\frac{\\sin x}{\\cos x}(2\\cos^2 x - 1) = 4\\sin x\\cos x - \\frac{2\\sin x}{\\cos x} = 2\\sin 2x - 2\\tg x $$<br>
$$ C_1' = \\frac{\\Delta_1}{\\Delta} = \\cos 2x - 1 \\implies C_1 = \\frac{1}{2}\\sin 2x - x + D_1 $$
$$ C_2' = \\frac{\\Delta_2}{\\Delta} = \\sin 2x - \\tg x \\implies C_2 = -\\frac{1}{2}\\cos 2x + \\ln|\\cos x| + D_2 $$<br>
<br>Сборка решения:
$$ y_{о.н.} = \\left(\\frac{1}{2}\\sin 2x - x + D_1\\right)\\cos 2x + \\left(-\\frac{1}{2}\\cos 2x + \\ln|\\cos x| + D_2\\right)\\sin 2x $$
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = \\left(\\frac{1}{2}\\sin 2x - x + D_1\\right)\\cos 2x + \\left(-\\frac{1}{2}\\cos 2x + \\ln|\\cos x| + D_2\\right)\\sin 2x $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 2y' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 - 2\\lambda + 1 = 0 \\implies (\\lambda-1)^2 = 0 \\implies \\lambda_{1,2} = 1 $$<br>
ФСР: $$ e^x,\\; x e^x $$
$$ y_{о.о.} = (C_1 + C_2 x) e^x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} e^x \\cdot C_1' + x e^x \\cdot C_2' = 0 \\\\ e^x \\cdot C_1' + (e^x + x e^x) \\cdot C_2' = \\frac{e^x}{x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} e^x & x e^x \\\\ e^x & e^x + x e^x \\end{vmatrix} = e^{2x} + x e^{2x} - x e^{2x} = e^{2x} $$
$$ \\Delta_1 = \\begin{vmatrix} 0 & x e^x \\\\ \\frac{e^x}{x} & e^x + x e^x \\end{vmatrix} = -e^{2x} $$
$$ \\Delta_2 = \\begin{vmatrix} e^x & 0 \\\\ e^x & \\frac{e^x}{x} \\end{vmatrix} = \\frac{e^{2x}}{x} $$<br>
$$ C_1' = \\frac{\\Delta_1}{\\Delta} = -1 \\implies C_1 = -x + D_1 $$
$$ C_2' = \\frac{\\Delta_2}{\\Delta} = \\frac{1}{x} \\implies C_2 = \\ln|x| + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = e^x (D_1 + D_2 x - x + x \\ln|x|) $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 3y' + 2y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 3\\lambda + 2 = 0 \\implies (\\lambda+1)(\\lambda+2)=0 \\implies \\lambda_1 = -1,\\; \\lambda_2 = -2 $$<br>
ФСР: $$ e^{-x},\\; e^{-2x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 e^{-2x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} e^{-x} \\cdot C_1' + e^{-2x} \\cdot C_2' = 0 \\\\ -e^{-x} \\cdot C_1' - 2e^{-2x} \\cdot C_2' = \\frac{1}{e^x + 1} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} e^{-x} & e^{-2x} \\\\ -e^{-x} & -2e^{-2x} \\end{vmatrix} = -2e^{-3x} + e^{-3x} = -e^{-3x} $$
$$ \\Delta_1 = \\begin{vmatrix} 0 & e^{-2x} \\\\ \\frac{1}{e^x+1} & -2e^{-2x} \\end{vmatrix} = -\\frac{e^{-2x}}{e^x+1} $$
$$ \\Delta_2 = \\begin{vmatrix} e^{-x} & 0 \\\\ -e^{-x} & \\frac{1}{e^x+1} \\end{vmatrix} = \\frac{e^{-x}}{e^x+1} $$<br>
$$ C_1' = \\frac{\\Delta_1}{\\Delta} = \\frac{e^x}{e^x+1} \\implies C_1 = \\ln(e^x+1) + D_1 $$
$$ C_2' = \\frac{\\Delta_2}{\\Delta} = -\\frac{e^{2x}}{e^x+1} \\implies C_2 = -\\int\\frac{t}{t+1}dt = -e^x + \\ln(e^x+1) + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 e^{-x} + D_2 e^{-2x} + (e^{-x} + e^{-2x}) \\ln(e^x+1) - e^{-x} $$`,

    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (метод вариации произвольных постоянных):
$$ y_{о.н.} = C_1(x) \cos x + C_2(x) \sin x $$
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \dfrac{2}{\cos^3 x} \end{cases} $$<br>
Определитель Вронского:
$$ \Delta = \begin{vmatrix} \cos x & \sin x \\ -\sin x & \cos x \end{vmatrix} = \cos^2 x + \sin^2 x = 1 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin x \\ \dfrac{2}{\cos^3 x} & \cos x \end{vmatrix} = -\frac{2\sin x}{\cos^3 x} $$
$$ \Delta_2 = \begin{vmatrix} \cos x & 0 \\ -\sin x & \dfrac{2}{\cos^3 x} \end{vmatrix} = \frac{2\cos x}{\cos^3 x} = \frac{2}{\cos^2 x} $$<br>
Находим производные:
$$ C_1' = \frac{\Delta_1}{\Delta} = -\frac{2\sin x}{\cos^3 x}, \qquad C_2' = \frac{\Delta_2}{\Delta} = \frac{2}{\cos^2 x} $$<br>
Интегрируем:
$$ C_1 = \int -\frac{2\sin x}{\cos^3 x}\,dx = \left[ \begin{smallmatrix} t = \cos x \\ dt = -\sin x\,dx \end{smallmatrix} \right] = \int 2t^{-3}\,dt = -t^{-2} + D_1 = -\frac{1}{\cos^2 x} + D_1 $$
$$ C_2 = \int \frac{2}{\cos^2 x}\,dx = 2\tg x + D_2 $$<br>
Сборка общего решения:
$$ y_{о.н.} = \left(D_1 - \frac{1}{\cos^2 x}\right)\cos x + (2\tg x + D_2)\sin x $$
$$ = D_1\cos x - \frac{1}{\cos x} + 2\frac{\sin^2 x}{\cos x} + D_2\sin x $$
$$ = D_1\cos x + D_2\sin x - \frac{1}{\cos x} + \frac{2(1 - \cos^2 x)}{\cos x} $$
$$ = D_1\cos x + D_2\sin x - \frac{1}{\cos x} + \frac{2}{\cos x} - 2\cos x $$
$$ = (D_1 - 2)\cos x + D_2\sin x + \frac{1}{\cos x} $$<br>
Переобозначаем константы $$ C_1 = D_1 - 2,\; C_2 = D_2 $$:<br>
<strong>Ответ:</strong>
$$ y = C_1 \cos x + C_2 \sin x + \frac{1}{\cos x} $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - y' = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 - \\lambda = 0 \\implies \\lambda(\\lambda-1)=0 \\implies \\lambda_1 = 0,\\; \\lambda_2 = 1 $$<br>
ФСР: $$ 1,\\; e^x $$
$$ y_{о.о.} = C_1 + C_2 e^x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} 1 \\cdot C_1' + e^x \\cdot C_2' = 0 \\\\ 0 \\cdot C_1' + e^x \\cdot C_2' = \\frac{e^{2x}}{e^x+1} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = e^x $$
$$ \\Delta_1 = -\\frac{e^{3x}}{e^x+1} $$
$$ \\Delta_2 = \\frac{e^{2x}}{e^x+1} $$<br>
$$ C_1' = -\\frac{e^{2x}}{e^x+1} \\implies C_1 = -\\int\\frac{t^2}{t+1}dt = -e^x + \\ln(e^x+1) + D_1 $$
$$ C_2' = \\frac{e^x}{e^x+1} \\implies C_2 = \\ln(e^x+1) + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 + D_2 e^x + (e^x+1)\\ln(e^x+1) - e^x $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 2y' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 2\\lambda + 1 = 0 \\implies (\\lambda+1)^2 = 0 \\implies \\lambda_{1,2} = -1 $$<br>
ФСР: $$ e^{-x},\\; x e^{-x} $$
$$ y_{о.о.} = (C_1 + C_2 x) e^{-x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} e^{-x} \\cdot C_1' + x e^{-x} \\cdot C_2' = 0 \\\\ -e^{-x} \\cdot C_1' + (1-x)e^{-x} \\cdot C_2' = \\frac{e^{-x}}{x^2} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = e^{-2x} $$
$$ \\Delta_1 = -\\frac{e^{-2x}}{x} $$
$$ \\Delta_2 = \\frac{e^{-2x}}{x^2} $$<br>
$$ C_1' = -\\frac{1}{x} \\implies C_1 = -\\ln|x| + D_1 $$
$$ C_2' = \\frac{1}{x^2} \\implies C_2 = -\\frac{1}{x} + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = e^{-x}(D_1 + D_2 x - \\ln|x|) $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 1 = 0 \\implies \\lambda_{1,2} = \\pm i $$<br>
ФСР: $$ \\cos x,\\; \\sin x $$
$$ y_{о.о.} = C_1 \\cos x + C_2 \\sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos x \\cdot C_1' + \\sin x \\cdot C_2' = 0 \\\\ -\\sin x \\cdot C_1' + \\cos x \\cdot C_2' = \\frac{1}{\\sin^3 x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = 1 $$
$$ \\Delta_1 = -\\frac{1}{\\sin^2 x} $$
$$ \\Delta_2 = \\frac{\\cos x}{\\sin^3 x} $$<br>
$$ C_1' = -\\frac{1}{\\sin^2 x} \\implies C_1 = \\ctg x + D_1 $$
$$ C_2' = \\sin^{-3} x \\, d(\\sin x) \\implies C_2 = -\\frac{1}{2\\sin^2 x} + D_2 $$<br>
Сборка решения:
$$ y_{о.н.} = (D_1 + \\ctg x)\\cos x + \\left(D_2 - \\frac{1}{2\\sin^2 x}\\right)\\sin x = D_1\\cos x + D_2\\sin x + \\frac{\\cos^2 x}{\\sin x} - \\frac{1}{2\\sin x} $$
Учитывая $$ \\frac{\\cos^2 x}{\\sin x} = \\frac{1-\\sin^2 x}{\\sin x} = \\frac{1}{\\sin x} - \\sin x $$:<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \\cos x + D_2 \\sin x + \\frac{1}{2\\sin x} $$`
],

    
[
        null,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 2y' - 3y = e^{4x} $$
Характеристическое уравнение:
$$ \lambda^2 - 2\lambda - 3 = 0 $$
$$ \implies \lambda_1 = 3,\; \lambda_2 = -1 $$<br>
ФСР: $$ e^{3x},\; e^{-x} $$
$$ y_{о.о.} = C_1 e^{3x} + C_2 e^{-x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = e^{4x} $$
$$ \alpha = 4,\; \beta = 0,\; \deg(P) = 0 $$
$$ \alpha + \beta i = 4 \text{ не совпадает с корнями} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x^{0} \cdot e^{4x} \cdot A = A e^{4x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 4A e^{4x} $$
$$ y''_{ч.н.} = 16A e^{4x} $$
<br>Подставляем в исходное уравнение:
$$ 16A e^{4x} - 2(4A e^{4x}) - 3(A e^{4x}) = e^{4x} $$
$$ (16A - 8A - 3A) e^{4x} = e^{4x} \implies 5A = 1 \implies A = \frac{1}{5} $$
<br>Частное решение:
$$ y_{ч.н.} = \frac{1}{5} e^{4x} $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 e^{3x} + C_2 e^{-x} + \frac{1}{5} e^{4x} $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 4\sin x $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4\sin x $$
$$ \alpha = 0,\; \beta = 1,\; \deg(P) = -\infty,\; \deg(Q) = 0 $$
$$ \alpha + \beta i = i \text{ совпадает с корнем} \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x^{1} \cdot e^{0 \cdot x} (A \cos x + B \sin x) = x(A \cos x + B \sin x) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (A\cos x + B\sin x) + x(-A\sin x + B\cos x) $$
$$ y''_{ч.н.} = -2A\sin x + 2B\cos x - x(A\cos x + B\sin x) $$
<br>Подставляем в исходное уравнение:
$$ -2A\sin x + 2B\cos x - \cancel{x(A\cos x + B\sin x)} + \cancel{x(A\cos x + B\sin x)} = 4\sin x $$
$$ -2A\sin x + 2B\cos x = 4\sin x + 0\cdot\cos x $$
$$ \begin{cases} -2A = 4 \\ 2B = 0 \end{cases} \implies \begin{cases} A = -2 \\ B = 0 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -2x\cos x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 \cos x + C_2 \sin x - 2x \cos x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 5y' + 4y = 4x^2 e^{2x} $$
Характеристическое уравнение:
$$ \lambda^2 - 5\lambda + 4 = 0 \implies (\lambda - 1)(\lambda - 4) = 0 $$
$$ \implies \lambda_1 = 1,\; \lambda_2 = 4 $$<br>
ФСР: $$ e^x,\; e^{4x} $$
$$ y_{о.о.} = C_1 e^x + C_2 e^{4x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4x^2 e^{2x} $$
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 2 $$
$$ \alpha + \beta i = 2 \text{ не является корнем} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 2 \implies R(x) = Ax^2 + Bx + C,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{0} \cdot e^{2x} (Ax^2 + Bx + C) = (Ax^2 + Bx + C) e^{2x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (2Ax + B)e^{2x} + 2(Ax^2 + Bx + C)e^{2x} $$
$$ y''_{ч.н.} = (2A)e^{2x} + 2(2Ax + B)e^{2x} + \big[2(2Ax + B)e^{2x} + 4(Ax^2 + Bx + C)e^{2x}\big] $$
$$ y''_{ч.н.} = \big(4Ax^2 + (8A + 4B)x + (2A + 4B + 4C)\big)e^{2x} $$
<br>Подставляем в исходное уравнение:
$$ \big[4Ax^2 + (8A + 4B)x + 2A + 4B + 4C - 5(2Ax^2 + (2A + 2B)x + B + 2C) + 4(Ax^2 + Bx + C)\big] e^{2x} = 4x^2 e^{2x} $$
$$ \text{Группируем по степеням }x: $$
$$ \begin{cases} x^2: 4A - 10A + 4A = -2A = 4 \implies A = -2 \\ x: 8A + 4B - 10A - 10B + 4B = -2A - 2B = 0 \implies B = 2 \\ 1: 2A + 4B + 4C - 5B - 10C + 4C = 2A - B - 2C = 0 \implies C = -3 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = (-2x^2 + 2x - 3) e^{2x} $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 e^x + C_2 e^{4x} - (2x^2 - 2x + 3) e^{2x} $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 2y' + y = 6x e^x $$
Характеристическое уравнение:
$$ \lambda^2 - 2\lambda + 1 = 0 \implies (\lambda - 1)^2 = 0 $$
$$ \implies \lambda_{1,2} = 1 \text{ (кр. 2)} $$<br>
ФСР: $$ e^x,\; x e^x $$
$$ y_{о.о.} = (C_1 + C_2 x) e^x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 6x e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 1 \text{ совпадает с корнем кр. 2} \implies S = 2 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x^2 \cdot e^x (Ax + B) = (Ax^3 + Bx^2) e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (3Ax^2 + 2Bx)e^x + (Ax^3 + Bx^2)e^x = (Ax^3 + (3A + B)x^2 + 2Bx)e^x $$
$$ y''_{ч.н.} = \big(Ax^3 + (6A + B)x^2 + (6A + 4B)x + 2B\big)e^x $$
<br>Подставляем в исходное уравнение:
$$ \big[\cancel{Ax^3} + (6A + B)x^2 + (6A + 4B)x + 2B - 2(Ax^3 + (3A + B)x^2 + 2Bx) + (\cancel{Ax^3} + Bx^2)\big]e^x = 6x e^x $$
$$ \text{Сравниваем коэффициенты:} $$
$$ \begin{cases} x^2: 6A + B - 6A - 2B + B = 0 \\ x: 6A + 4B - 4B = 6A = 6 \implies A = 1 \\ 1: 2B = 0 \implies B = 0 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = x^3 e^x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = (C_1 + C_2 x + x^3) e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 4x e^x $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4x e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 1 \text{ не является корнем} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{0} \cdot e^x (Ax + B) = (Ax + B) e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^x + (Ax + B)e^x = (Ax + A + B)e^x $$
$$ y''_{ч.н.} = A e^x + (Ax + A + B)e^x = (Ax + 2A + B)e^x $$
<br>Подставляем в исходное уравнение:
$$ (Ax + 2A + B)e^x + (Ax + B)e^x = 4x e^x $$
$$ 2Ax + (2A + 2B) = 4x \quad \big|\text{ сокращаем }e^x $$
$$ \begin{cases} 2A = 4 \\ 2A + 2B = 0 \end{cases} \implies \begin{cases} A = 2 \\ B = -2 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = (2x - 2) e^x = 2(x - 1) e^x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 \cos x + C_2 \sin x + 2(x - 1) e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 4y' + 4y = x e^{2x} $$
Характеристическое уравнение:
$$ \lambda^2 + 4\lambda + 4 = 0 \implies (\lambda + 2)^2 = 0 $$
$$ \implies \lambda = -2 \text{ (кр. 2)} $$<br>
ФСР: $$ e^{-2x},\; x e^{-2x} $$
$$ y_{о.о.} = (C_1 + C_2 x) e^{-2x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = x e^{2x} $$
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 2 \text{ не совпадает с }\lambda = -2 \implies S = 0 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{0} \cdot e^{2x} (Ax + B) = (Ax + B) e^{2x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^{2x} + 2(Ax + B) e^{2x} = (2Ax + 2B + A) e^{2x} $$
$$ y''_{ч.н.} = 2A e^{2x} + 2(2Ax + 2B + A) e^{2x} = (4Ax + 4B + 4A) e^{2x} $$
<br>Подставляем в исходное уравнение:
$$ (4Ax + 4B + 4A) e^{2x} + 4(2Ax + 2B + A) e^{2x} + 4(Ax + B) e^{2x} = x e^{2x} $$
$$ (4Ax + 4B + 4A + 8Ax + 8B + 4A + 4Ax + 4B) e^{2x} = x e^{2x} $$
$$ (16Ax + (8A + 16B)) e^{2x} = x e^{2x} $$
$$ \begin{cases} 16A = 1 \implies A = \frac{1}{16} \\ 8A + 16B = 0 \implies B = -\frac{1}{32} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = \left(\frac{1}{16}x - \frac{1}{32}\right) e^{2x} = \frac{2x - 1}{32} e^{2x} $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = (C_1 + C_2 x) e^{-2x} + \frac{2x - 1}{32} e^{2x} $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 9y = \cos 3x $$
Характеристическое уравнение:
$$ \lambda^2 + 9 = 0 $$
$$ \implies \lambda_{1,2} = \pm 3i $$<br>
ФСР: $$ \cos 3x,\; \sin 3x $$
$$ y_{о.о.} = C_1 \cos 3x + C_2 \sin 3x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = \cos 3x $$
$$ \alpha = 0,\; \beta = 3,\; \deg(P) = 0,\; \deg(Q) = -\infty $$
$$ \alpha + \beta i = 3i \text{ совпадает с корнем} \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x^{1} \cdot e^{0 \cdot x} (A \cos 3x + B \sin 3x) = x(A \cos 3x + B \sin 3x) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (A\cos 3x + B\sin 3x) + x(-3A\sin 3x + 3B\cos 3x) $$
$$ y''_{ч.н.} = -6A\sin 3x + 6B\cos 3x - 9x(A\cos 3x + B\sin 3x) $$
<br>Подставляем в исходное уравнение:
$$ [-6A\sin 3x + 6B\cos 3x - 9x(A\cos 3x + B\sin 3x)] + 9x(A\cos 3x + B\sin 3x) = \cos 3x $$
$$ -6A\sin 3x + 6B\cos 3x = \cos 3x $$
$$ \begin{cases} -6A = 0 \implies A = 0 \\ 6B = 1 \implies B = \frac{1}{6} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = \frac{x}{6} \sin 3x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 \cos 3x + C_2 \sin 3x + \frac{x}{6} \sin 3x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 4y' + 8y = e^{2x} + \sin 2x $$
Характеристическое уравнение:
$$ \lambda^2 - 4\lambda + 8 = 0 $$
$$ \implies \lambda_{1,2} = 2 \pm 2i $$<br>
ФСР: $$ e^{2x}\cos 2x,\; e^{2x}\sin 2x $$
$$ y_{о.о.} = e^{2x}(C_1 \cos 2x + C_2 \sin 2x) $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
<br>Принцип суперпозиции:
$$ y_{ч.н.} = y_1 + y_2 $$<br>
<br>Для $f_1(x) = e^{2x}$:<br>
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 0,\; S = 0 $$<br>
$$ y_{ч.н.}^{(1)} = A e^{2x} $$<br>
Находим производные:
$$ y' = 2A e^{2x} $$
$$ y'' = 4A e^{2x} $$
Подставляем в исходное уравнение:
$$ 4A e^{2x} - 8A e^{2x} + 8A e^{2x} = e^{2x} \implies 4A = 1 \implies A = \frac{1}{4} $$
<br>Частное решение: $$ \frac{1}{4} e^{2x} $$<br>
<br>Для $f_2(x) = \sin 2x$:<br>
$$ \alpha = 0,\; \beta = 2,\; \deg(Q) = 0,\; S = 0 $$<br>
$$ y_{ч.н.}^{(1)} = B \cos 2x + C \sin 2x $$<br>
Находим производные:
$$ y' = -2B\sin 2x + 2C\cos 2x $$
$$ y'' = -4B\cos 2x - 4C\sin 2x $$
Подставляем в исходное уравнение:
$$ (-4B - 8C + 8B)\cos 2x + (-4C + 8B + 8C)\sin 2x = \sin 2x $$
$$ \begin{cases} 4B - 8C = 0 \implies B = \frac{1}{10} \\ 8B + 4C = 1 \implies C = \frac{1}{20} \end{cases} $$
<br>Частное решение: $$ \frac{1}{10}\cos 2x + \frac{1}{20}\sin 2x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = e^{2x}(C_1 \cos 2x + C_2 \sin 2x) + \frac{1}{4}e^{2x} + \frac{1}{10}\cos 2x + \frac{1}{20}\sin 2x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 5y' = 3x^2 $$
Характеристическое уравнение:
$$ \lambda^2 - 5\lambda = 0 \implies \lambda(\lambda - 5) = 0 $$
$$ \implies \lambda_1 = 0,\; \lambda_2 = 5 $$<br>
ФСР: $$ 1,\; e^{5x} $$
$$ y_{о.о.} = C_1 + C_2 e^{5x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 3x^2 $$
$$ \alpha = 0,\; \beta = 0,\; \deg(P) = 2 $$
$$ \alpha + \beta i = 0 \text{ совпадает с корнем }\lambda_1 = 0 \implies S = 1 $$
$$ \deg(R) = \deg(T) = 2 \implies R(x) = Ax^2 + Bx + C,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{1} \cdot e^{0 \cdot x} (Ax^2 + Bx + C) = Ax^3 + Bx^2 + Cx $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 3Ax^2 + 2Bx + C $$
$$ y''_{ч.н.} = 6Ax + 2B $$
<br>Подставляем в исходное уравнение:
$$ (6Ax + 2B) - 5(3Ax^2 + 2Bx + C) = 3x^2 $$
$$ -15Ax^2 + (6A - 10B)x + (2B - 5C) = 3x^2 + 0\cdot x + 0 $$
$$ \begin{cases} -15A = 3 \implies A = -\dfrac{1}{5} \\ 6A - 10B = 0 \implies B = -\dfrac{3}{25} \\ 2B - 5C = 0 \implies C = -\dfrac{6}{125} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -\frac{1}{5}x^3 - \frac{3}{25}x^2 - \frac{6}{125}x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 + C_2 e^{5x} - \frac{1}{5}x^3 - \frac{3}{25}x^2 - \frac{6}{125}x $$`
    ]
,
    
[
    null, // Сдвиг (если используется в вашем коде)
    
    // 3.2
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 4 = 0 \implies \lambda_{1,2} = \pm 2i $$
ФСР: $$ \cos 2x \text{, } \sin 2x $$
$$ y_{о.о.} = C_1 \cos 2x + C_2 \sin 2x $$
<br>Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos 2x \cdot C_1' + \sin 2x \cdot C_2' = 0 \\ -2\sin 2x \cdot C_1' + 2\cos 2x \cdot C_2' = \frac{1}{\sin 2x} \end{cases} $$
<br>Считаем определители:
$$ \Delta = 2\cos^2 2x + 2\sin^2 2x = 2 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin 2x \\ \frac{1}{\sin 2x} & 2\cos 2x \end{vmatrix} = -1 $$
$$ \Delta_2 = \begin{vmatrix} \cos 2x & 0 \\ -2\sin 2x & \frac{1}{\sin 2x} \end{vmatrix} = \ctg 2x $$
<br>Находим производные:
$$ C_1' = -\frac{1}{2} \implies C_1 = -\frac{x}{2} + D_1 $$
$$ C_2' = \frac{1}{2}\ctg 2x \implies C_2 = \frac{1}{4}\ln|\sin 2x| + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = \left(D_1 - \frac{x}{2}\right)\cos 2x + \left(D_2 + \frac{1}{4}\ln|\sin 2x|\right)\sin 2x $$
<br>Используем начальные условия задачи Коши:
$$ y\left(\frac{\pi}{4}\right) = 1 \implies \left(D_1 - \frac{\pi}{8}\right)\cdot 0 + \left(D_2 + \frac{1}{4}\ln 1\right)\cdot 1 = 1 \implies D_2 = 1 $$
<br>Считаем производную:
$$ y'_{о.н.} = -\frac{1}{2}\cos 2x - 2\left(D_1 - \frac{x}{2}\right)\sin 2x + \frac{1}{2}\ctg 2x \sin 2x + 2\left(1 + \frac{1}{4}\ln|\sin 2x|\right)\cos 2x $$
$$ y'\left(\frac{\pi}{4}\right) = 0 \implies 0 - 2\left(D_1 - \frac{\pi}{8}\right)\cdot 1 + 0 + 0 = 0 \implies D_1 = \frac{\pi}{8} $$
<br><strong>Ответ:</strong>
$$ y = \left(\frac{\pi}{8} - \frac{x}{2}\right)\cos 2x + \left(1 + \frac{1}{4}\ln|\sin 2x|\right)\sin 2x $$`,

    // 3.3
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 1 = 0 \implies \lambda_{1,2} = \pm i $$
ФСР: $$ \cos x \text{, } \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \frac{1}{\sin^2 x} \end{cases} $$
<br>Считаем определители:
$$ \Delta = 1 $$
$$ \Delta_1 = -\frac{1}{\sin x} \implies C_1' = -\frac{1}{\sin x} \implies C_1 = -\ln\left|\tg\frac{x}{2}\right| + D_1 $$
$$ \Delta_2 = \frac{\cos x}{\sin^2 x} \implies C_2' = \frac{\cos x}{\sin^2 x} \implies C_2 = -\frac{1}{\sin x} + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = \left(D_1 - \ln\left|\tg\frac{x}{2}\right|\right)\cos x + \left(D_2 - \frac{1}{\sin x}\right)\sin x = D_1\cos x - \cos x\ln\left|\tg\frac{x}{2}\right| + D_2\sin x - 1 $$
<br>Используем начальные условия:
$$ y\left(\frac{\pi}{2}\right) = 0 \implies D_1\cdot 0 - 0 + D_2\cdot 1 - 1 = 0 \implies D_2 = 1 $$
$$ y'_{о.н.} = -D_1\sin x + \sin x\ln\left|\tg\frac{x}{2}\right| - \cos x \cdot \frac{1}{\sin x} + D_2\cos x $$
$$ y'\left(\frac{\pi}{2}\right) = 1 \implies -D_1\cdot 1 + 1\cdot \ln(1) - 0 + 0 = 1 \implies D_1 = -1 $$
<br><strong>Ответ:</strong>
$$ y = -\cos x - \cos x\ln\left|\tg\frac{x}{2}\right| + \sin x - 1 $$`,

    // 3.4
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 2\lambda + 1 = 0 \implies (\lambda + 1)^2 = 0 \implies \lambda_{1,2} = -1 $$
ФСР: $$ e^{-x} \text{, } x e^{-x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 x e^{-x} $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} e^{-x} \cdot C_1' + x e^{-x} \cdot C_2' = 0 \\ -e^{-x} \cdot C_1' + (1-x)e^{-x} \cdot C_2' = \frac{e^{-x}}{x+1} \end{cases} $$
<br>Считаем определители:
$$ \Delta = e^{-2x} $$
$$ \Delta_1 = -\frac{x e^{-2x}}{x+1} \implies C_1' = -\frac{x}{x+1} = \frac{1}{x+1} - 1 \implies C_1 = \ln|x+1| - x + D_1 $$
$$ \Delta_2 = \frac{e^{-2x}}{x+1} \implies C_2' = \frac{1}{x+1} \implies C_2 = \ln|x+1| + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = (D_1 - x + \ln|x+1|)e^{-x} + (D_2 + \ln|x+1|)x e^{-x} = e^{-x}(D_1 + D_2 x - x + (x+1)\ln|x+1|) $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies 1 \cdot (D_1 + 0 - 0 + 1\cdot 0) = 1 \implies D_1 = 1 $$
$$ y'_{о.н.} = -e^{-x}(D_1 + D_2 x - x + (x+1)\ln|x+1|) + e^{-x}(D_2 - 1 + \ln|x+1| + 1) $$
$$ y'(0) = -1 \implies -1 \cdot (1) + 1 \cdot (D_2 - 1 + 0 + 1) = -1 \implies -1 + D_2 = -1 \implies D_2 = 0 $$
<br><strong>Ответ:</strong>
$$ y = e^{-x}(1 - x + (x+1)\ln(x+1)) $$`,

    // 3.5
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 9 = 0 \implies \lambda_{1,2} = \pm 3i $$
ФСР: $$ \cos 3x \text{, } \sin 3x $$
$$ y_{о.о.} = C_1 \cos 3x + C_2 \sin 3x $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} \cos 3x \cdot C_1' + \sin 3x \cdot C_2' = 0 \\ -3\sin 3x \cdot C_1' + 3\cos 3x \cdot C_2' = \frac{1}{\cos 3x} \end{cases} $$
<br>Считаем определители:
$$ \Delta = 3\cos^2 3x + 3\sin^2 3x = 3 $$
$$ \Delta_1 = -\frac{\sin 3x}{\cos 3x} = -\tg 3x \implies C_1' = -\frac{1}{3}\tg 3x \implies C_1 = \frac{1}{9}\ln|\cos 3x| + D_1 $$
$$ \Delta_2 = 1 \implies C_2' = \frac{1}{3} \implies C_2 = \frac{x}{3} + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = \left(D_1 + \frac{1}{9}\ln|\cos 3x|\right)\cos 3x + \left(D_2 + \frac{x}{3}\right)\sin 3x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies D_1\cdot 1 + 0 = 0 \implies D_1 = 0 $$
$$ y'_{о.н.} = -3D_1\sin 3x - \frac{1}{3}\sin 3x\ln|\cos 3x| - \frac{1}{3}\sin 3x + 3D_2\cos 3x + \frac{1}{3}\sin 3x + x\cos 3x $$
$$ y'(0) = 0 \implies 0 - 0 - 0 + 3D_2 + 0 + 0 = 0 \implies D_2 = 0 $$
<br><strong>Ответ:</strong>
$$ y = \frac{1}{9}\cos 3x\ln|\cos 3x| + \frac{x}{3}\sin 3x $$`,

    // 3.6
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - \lambda = 0 \implies \lambda(\lambda - 1) = 0 \implies \lambda_1 = 0, \lambda_2 = 1 $$
ФСР: $$ 1 \text{, } e^x $$
$$ y_{о.о.} = C_1 + C_2 e^x $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} 1 \cdot C_1' + e^x \cdot C_2' = 0 \\ 0 \cdot C_1' + e^x \cdot C_2' = \frac{e^x}{e^x + 2} \end{cases} $$
<br>Считаем определители:
$$ \Delta = e^x $$
$$ \Delta_1 = -\frac{e^{2x}}{e^x+2} \implies C_1' = -\frac{e^x}{e^x+2} \implies C_1 = -\ln(e^x+2) + D_1 $$
$$ \Delta_2 = \frac{e^x}{e^x+2} \implies C_2' = \frac{1}{e^x+2} = \frac{1}{2}\left(1 - \frac{e^x}{e^x+2}\right)e^{-x} \implies \text{замена } t=e^x $$
$$ C_2 = \int \frac{1}{t(t+2)} dt = \frac{1}{2}\int \left(\frac{1}{t} - \frac{1}{t+2}\right) dt = \frac{1}{2}\ln\left(\frac{e^x}{e^x+2}\right) + D_2 = \frac{x}{2} - \frac{1}{2}\ln(e^x+2) + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1 - \ln(e^x+2) + D_2 e^x + \frac{x}{2}e^x - \frac{e^x}{2}\ln(e^x+2) $$
<br>Используем начальные условия:
$$ y(0) = \ln 3 \implies D_1 - \ln 3 + D_2 - \frac{1}{2}\ln 3 = \ln 3 \implies D_1 + D_2 = \frac{5}{2}\ln 3 $$
$$ y'_{о.н.} = -\frac{e^x}{e^x+2} + D_2 e^x + \frac{1}{2}e^x + \frac{x}{2}e^x - \frac{e^x}{2}\ln(e^x+2) - \frac{e^{2x}}{2(e^x+2)} $$
$$ y'(0) = 0 \implies -\frac{1}{3} + D_2 + \frac{1}{2} + 0 - \frac{1}{2}\ln 3 - \frac{1}{6} = 0 \implies D_2 = \frac{1}{2}\ln 3 $$
$$ \implies D_1 = 2\ln 3 $$
<br><strong>Ответ:</strong>
$$ y = 2\ln 3 + \frac{1}{2}e^x\ln 3 - \ln(e^x+2) + \frac{x}{2}e^x - \frac{e^x}{2}\ln(e^x+2) $$`,

    // 3.7
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 1 = 0 \implies \lambda_{1,2} = \pm i $$
ФСР: $$ \cos x \text{, } \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \ctg x \end{cases} $$
<br>Считаем определители:
$$ \Delta = 1 $$
$$ \Delta_1 = -\ctg x \sin x = -\cos x \implies C_1' = -\cos x \implies C_1 = -\sin x + D_1 $$
$$ \Delta_2 = \ctg x \cos x = \frac{\cos^2 x}{\sin x} = \frac{1}{\sin x} - \sin x \implies C_2' = \frac{1}{\sin x} - \sin x \implies C_2 = \ln\left|\tg\frac{x}{2}\right| + \cos x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = (D_1 - \sin x)\cos x + \left(D_2 + \ln\left|\tg\frac{x}{2}\right| + \cos x\right)\sin x = D_1\cos x + D_2\sin x + \sin x\ln\left|\tg\frac{x}{2}\right| $$
<br>Используем начальные условия:
$$ y\left(\frac{\pi}{2}\right) = 0 \implies D_1\cdot 0 + D_2\cdot 1 + 1\cdot \ln 1 = 0 \implies D_2 = 0 $$
$$ y'_{о.н.} = -D_1\sin x + D_2\cos x + \cos x\ln\left|\tg\frac{x}{2}\right| + \sin x \cdot \frac{1}{\tg\frac{x}{2}} \cdot \frac{1}{\cos^2\frac{x}{2}} \cdot \frac{1}{2} = -D_1\sin x + \cos x\ln\left|\tg\frac{x}{2}\right| + 1 $$
$$ y'\left(\frac{\pi}{2}\right) = 0 \implies -D_1\cdot 1 + 0 + 1 = 0 \implies D_1 = 1 $$
<br><strong>Ответ:</strong>
$$ y = \cos x + \sin x\ln\left|\tg\frac{x}{2}\right| $$`,

    // 3.8
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 2\lambda + 1 = 0 \implies (\lambda - 1)^2 = 0 \implies \lambda_{1,2} = 1 $$
ФСР: $$ e^x \text{, } x e^x $$
$$ y_{о.о.} = C_1 e^x + C_2 x e^x $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} e^x \cdot C_1' + x e^x \cdot C_2' = 0 \\ e^x \cdot C_1' + (x+1)e^x \cdot C_2' = e^x \ln x \end{cases} $$
<br>Считаем определители:
$$ \Delta = e^{2x} $$
$$ \Delta_1 = -x e^{2x}\ln x \implies C_1' = -x\ln x \implies C_1 = -\frac{x^2}{2}\ln x + \frac{x^2}{4} + D_1 $$
$$ \Delta_2 = e^{2x}\ln x \implies C_2' = \ln x \implies C_2 = x\ln x - x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = e^x\left(D_1 - \frac{x^2}{2}\ln x + \frac{x^2}{4} + D_2 x + x^2\ln x - x^2\right) = e^x\left(D_1 + D_2 x - \frac{3}{4}x^2 + \frac{1}{2}x^2\ln x\right) $$
<br>Используем начальные условия:
$$ y(1) = 1 \implies e\left(D_1 + D_2 - \frac{3}{4} + 0\right) = 1 \implies D_1 + D_2 = \frac{1}{e} + \frac{3}{4} $$
$$ y'_{о.н.} = e^x\left(D_1 + D_2 x - \frac{3}{4}x^2 + \frac{1}{2}x^2\ln x\right) + e^x\left(D_2 - \frac{3}{2}x + x\ln x + \frac{x}{2}\right) $$
$$ y'(1) = 1 \implies e\left(D_1 + D_2 - \frac{3}{4} + D_2 - \frac{3}{2} + 0 + \frac{1}{2}\right) = 1 \implies D_1 + 2D_2 - \frac{7}{4} = \frac{1}{e} $$
$$ \begin{cases} D_1 + D_2 = \frac{1}{e} + \frac{3}{4} \\ D_1 + 2D_2 = \frac{1}{e} + \frac{7}{4} \end{cases} \implies D_2 = 1 \implies D_1 = \frac{1}{e} - \frac{1}{4} $$
<br><strong>Ответ:</strong>
$$ y = e^x\left(\frac{1}{e} - \frac{1}{4} + x - \frac{3}{4}x^2 + \frac{1}{2}x^2\ln x\right) $$`,

    // 3.9
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 4 = 0 \implies \lambda_{1,2} = \pm 2i $$
ФСР: $$ \cos 2x \text{, } \sin 2x $$
$$ y_{о.о.} = C_1 \cos 2x + C_2 \sin 2x $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} \cos 2x \cdot C_1' + \sin 2x \cdot C_2' = 0 \\ -2\sin 2x \cdot C_1' + 2\cos 2x \cdot C_2' = \tg 2x \end{cases} $$
<br>Считаем определители:
$$ \Delta = 2 $$
$$ \Delta_1 = -\tg 2x \sin 2x = \cos 2x - \frac{1}{\cos 2x} \implies C_1' = \frac{1}{2}\cos 2x - \frac{1}{2\cos 2x} \implies C_1 = \frac{1}{4}\sin 2x - \frac{1}{4}\ln\left|\tg\left(x+\frac{\pi}{4}\right)\right| + D_1 $$
$$ \Delta_2 = \sin 2x \implies C_2' = \frac{1}{2}\sin 2x \implies C_2 = -\frac{1}{4}\cos 2x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1\cos 2x + D_2\sin 2x - \frac{1}{4}\cos 2x\ln\left|\tg\left(x+\frac{\pi}{4}\right)\right| $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies D_1\cdot 1 + 0 - \frac{1}{4}\cdot 1 \cdot \ln 1 = 0 \implies D_1 = 0 $$
$$ y'_{о.н.} = -2D_1\sin 2x + 2D_2\cos 2x + \frac{1}{2}\sin 2x\ln\left|\tg\left(x+\frac{\pi}{4}\right)\right| - \frac{1}{4}\cos 2x \cdot \frac{2}{\cos 2x} $$
$$ y'(0) = 2 \implies 0 + 2D_2 + 0 - \frac{1}{2} = 2 \implies 2D_2 = \frac{5}{2} \implies D_2 = \frac{5}{4} $$
<br><strong>Ответ:</strong>
$$ y = \frac{5}{4}\sin 2x - \frac{1}{4}\cos 2x\ln\left|\tg\left(x+\frac{\pi}{4}\right)\right| $$`,

    // 3.10
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 3\lambda + 2 = 0 \implies (\lambda + 1)(\lambda + 2) = 0 \implies \lambda_1 = -1, \lambda_2 = -2 $$
ФСР: $$ e^{-x} \text{, } e^{-2x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 e^{-2x} $$
<br>Метод вариации произвольных постоянных:
$$ \begin{cases} e^{-x} \cdot C_1' + e^{-2x} \cdot C_2' = 0 \\ -e^{-x} \cdot C_1' - 2e^{-2x} \cdot C_2' = \frac{e^{-x}}{e^x + 2} \end{cases} $$
<br>Считаем определители:
$$ \Delta = -e^{-3x} $$
$$ \Delta_1 = -\frac{e^{-3x}}{e^x+2} \implies C_1' = \frac{1}{e^x+2} = \frac{1}{2}\left(1 - \frac{e^x}{e^x+2}\right) \implies C_1 = \frac{x}{2} - \frac{1}{2}\ln(e^x+2) + D_1 $$
$$ \Delta_2 = \frac{e^{-2x}}{e^x+2} \implies C_2' = -\frac{e^x}{e^x+2} \implies C_2 = -\ln(e^x+2) + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1 e^{-x} + D_2 e^{-2x} + \frac{x}{2}e^{-x} - \frac{e^{-x}}{2}\ln(e^x+2) - e^{-2x}\ln(e^x+2) $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies D_1 + D_2 - \frac{1}{2}\ln 3 - \ln 3 = 0 \implies D_1 + D_2 = \frac{3}{2}\ln 3 $$
$$ y'_{о.н.} = -D_1 e^{-x} - 2D_2 e^{-2x} + \frac{1}{2}e^{-x} - \frac{x}{2}e^{-x} + \frac{e^{-x}}{2}\ln(e^x+2) - \frac{1}{2(e^x+2)} + 2e^{-2x}\ln(e^x+2) - \frac{e^{-x}}{e^x+2} $$
$$ y'(0) = 0 \implies -D_1 - 2D_2 + \frac{1}{2} + \frac{1}{2}\ln 3 - \frac{1}{6} + 2\ln 3 - \frac{1}{3} = 0 \implies -D_1 - 2D_2 + \frac{5}{2}\ln 3 = 0 \implies D_1 + 2D_2 = \frac{5}{2}\ln 3 $$
$$ \begin{cases} D_1 + D_2 = \frac{3}{2}\ln 3 \\ D_1 + 2D_2 = \frac{5}{2}\ln 3 \end{cases} \implies D_2 = \ln 3 \implies D_1 = \frac{1}{2}\ln 3 $$
<br><strong>Ответ:</strong>
$$ y = \frac{\ln 3}{2} e^{-x} + \ln 3 \cdot e^{-2x} + \frac{x}{2}e^{-x} - \frac{e^{-x}}{2}\ln(e^x+2) - e^{-2x}\ln(e^x+2) $$`
]

,    
[
    null, // Сдвиг (если используется в вашем коде)

    // 4.2
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 4 = 0 \implies \lambda_{1,2} = \pm 2i $$
ФСР: $$ \cos 2x \text{, } \sin 2x $$
$$ y_{о.о.} = C_1 \cos 2x + C_2 \sin 2x $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 8\sin 2x \implies \alpha = 0, \beta = 2 $$
$$ \alpha + \beta i = 2i \text{ совпадает с корнем} \implies S = 1 \text{ (резонанс)} $$
$$ y_{ч.н.} = x(A\cos 2x + B\sin 2x) $$
<br>Считаем производные:
$$ y'_{ч.н.} = A\cos 2x + B\sin 2x + x(-2A\sin 2x + 2B\cos 2x) $$
$$ y''_{ч.н.} = -4A\sin 2x + 4B\cos 2x - 4x(A\cos 2x + B\sin 2x) $$
<br>Подставляем в $y'' + 4y = 8\sin 2x$:
$$ -4A\sin 2x + 4B\cos 2x - 4x(A\cos 2x + B\sin 2x) + 4x(A\cos 2x + B\sin 2x) = 8\sin 2x $$
$$ -4A\sin 2x + 4B\cos 2x = 8\sin 2x \implies \begin{cases} -4A = 8 \\ 4B = 0 \end{cases} \implies A = -2, B = 0 $$
$$ y_{ч.н.} = -2x\cos 2x $$
<br>Общее решение:
$$ y_{о.н.} = C_1 \cos 2x + C_2 \sin 2x - 2x\cos 2x $$
<br>Используем начальные условия задачи Коши:
$$ y(0) = 0 \implies C_1\cdot 1 + 0 - 0 = 0 \implies C_1 = 0 $$
$$ y'_{о.н.} = -2C_1\sin 2x + 2C_2\cos 2x - 2\cos 2x + 4x\sin 2x $$
$$ y'(0) = 0 \implies 2C_2 - 2 = 0 \implies C_2 = 1 $$
<br><strong>Ответ:</strong>
$$ y = \sin 2x - 2x\cos 2x $$`,

    // 4.3
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 2\lambda + 5 = 0 \implies \lambda_{1,2} = 1 \pm 2i $$
ФСР: $$ e^x\cos 2x \text{, } e^x\sin 2x $$
$$ y_{о.о.} = e^x(C_1 \cos 2x + C_2 \sin 2x) $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 10x^2 \implies \alpha = 0, \beta = 0 \implies \alpha + \beta i = 0 \text{ (не корень)} \implies S = 0 $$
$$ \deg(F) = 2 \implies y_{ч.н.} = Ax^2 + Bx + C $$
<br>Считаем производные:
$$ y'_{ч.н.} = 2Ax + B \quad y''_{ч.н.} = 2A $$
<br>Подставляем в $y'' - 2y' + 5y = 10x^2$:
$$ 2A - 2(2Ax + B) + 5(Ax^2 + Bx + C) = 10x^2 $$
$$ 5Ax^2 + (5B - 4A)x + (2A - 2B + 5C) = 10x^2 $$
$$ \begin{cases} 5A = 10 \implies A = 2 \\ 5B - 4A = 0 \implies 5B - 8 = 0 \implies B = \frac{8}{5} \\ 2A - 2B + 5C = 0 \implies 4 - \frac{16}{5} + 5C = 0 \implies 5C = -\frac{4}{5} \implies C = -\frac{4}{25} \end{cases} $$
$$ y_{ч.н.} = 2x^2 + \frac{8}{5}x - \frac{4}{25} $$
<br>Общее решение:
$$ y_{о.н.} = e^x(C_1 \cos 2x + C_2 \sin 2x) + 2x^2 + \frac{8}{5}x - \frac{4}{25} $$
<br>Используем начальные условия задачи Коши:
$$ y(0) = 0 \implies 1\cdot(C_1) - \frac{4}{25} = 0 \implies C_1 = \frac{4}{25} $$
$$ y'_{о.н.} = e^x(C_1 \cos 2x + C_2 \sin 2x) + e^x(-2C_1\sin 2x + 2C_2\cos 2x) + 4x + \frac{8}{5} $$
$$ y'(0) = 1 \implies C_1 + 2C_2 + \frac{8}{5} = 1 \implies \frac{4}{25} + 2C_2 + \frac{40}{25} = \frac{25}{25} \implies 2C_2 = -\frac{19}{25} \implies C_2 = -\frac{19}{50} $$
<br><strong>Ответ:</strong>
$$ y = e^x\left(\frac{4}{25} \cos 2x - \frac{19}{50} \sin 2x\right) + 2x^2 + \frac{8}{5}x - \frac{4}{25} $$`,

    // 4.4
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 2\lambda = 0 \implies \lambda(\lambda + 2) = 0 \implies \lambda_1 = 0, \lambda_2 = -2 $$
ФСР: $$ 1 \text{, } e^{-2x} $$
$$ y_{о.о.} = C_1 + C_2 e^{-2x} $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4x e^{-2x} \implies \alpha = -2, \beta = 0 \implies \alpha + \beta i = -2 \text{ (совпадает с корнем)} \implies S = 1 $$
$$ y_{ч.н.} = x^1(Ax + B)e^{-2x} = (Ax^2 + Bx)e^{-2x} $$
<br>Считаем производные:
$$ y'_{ч.н.} = (2Ax + B)e^{-2x} - 2(Ax^2 + Bx)e^{-2x} = (-2Ax^2 + 2Ax - 2Bx + B)e^{-2x} $$
$$ y''_{ч.н.} = (-4Ax + 2A - 2B)e^{-2x} - 2(-2Ax^2 + 2Ax - 2Bx + B)e^{-2x} = (4Ax^2 - 8Ax + 4Bx + 2A - 4B)e^{-2x} $$
<br>Подставляем в $y'' + 2y' = 4x e^{-2x}$:
$$ (4Ax^2 - 8Ax + 4Bx + 2A - 4B)e^{-2x} + 2(-2Ax^2 + 2Ax - 2Bx + B)e^{-2x} = 4x e^{-2x} $$
$$ (-4Ax + 2A - 2B)e^{-2x} = 4x e^{-2x} $$
$$ \begin{cases} -4A = 4 \implies A = -1 \\ 2A - 2B = 0 \implies B = A = -1 \end{cases} $$
$$ y_{ч.н.} = (-x^2 - x)e^{-2x} $$
<br>Общее решение:
$$ y_{о.н.} = C_1 + C_2 e^{-2x} - (x^2 + x)e^{-2x} $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + C_2 - 0 = 0 \implies C_1 = -C_2 $$
$$ y'_{о.н.} = -2C_2 e^{-2x} - (2x + 1)e^{-2x} + 2(x^2 + x)e^{-2x} $$
$$ y'(0) = 0 \implies -2C_2 - 1 + 0 = 0 \implies C_2 = -\frac{1}{2} \implies C_1 = \frac{1}{2} $$
<br><strong>Ответ:</strong>
$$ y = \frac{1}{2} - \frac{1}{2} e^{-2x} - (x^2 + x)e^{-2x} $$`,

    // 4.5
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 6\lambda + 9 = 0 \implies (\lambda - 3)^2 = 0 \implies \lambda = 3 \text{ (кр. 2)} $$
ФСР: $$ e^{3x} \text{, } x e^{3x} $$
$$ y_{о.о.} = (C_1 + C_2 x)e^{3x} $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 2e^{3x} \implies \alpha = 3, \beta = 0 \implies \alpha + \beta i = 3 \text{ (совпадает с корнем кратности 2)} \implies S = 2 $$
$$ y_{ч.н.} = x^2 \cdot A e^{3x} = A x^2 e^{3x} $$
<br>Считаем производные:
$$ y'_{ч.н.} = A(2x + 3x^2)e^{3x} $$
$$ y''_{ч.н.} = A(2 + 6x)e^{3x} + 3A(2x + 3x^2)e^{3x} = A(9x^2 + 12x + 2)e^{3x} $$
<br>Подставляем в $y'' - 6y' + 9y = 2e^{3x}$:
$$ A(9x^2 + 12x + 2)e^{3x} - 6A(3x^2 + 2x)e^{3x} + 9A x^2 e^{3x} = 2e^{3x} $$
$$ A(9x^2 + 12x + 2 - 18x^2 - 12x + 9x^2)e^{3x} = 2A e^{3x} = 2e^{3x} \implies A = 1 $$
$$ y_{ч.н.} = x^2 e^{3x} $$
<br>Общее решение:
$$ y_{о.н.} = (C_1 + C_2 x)e^{3x} + x^2 e^{3x} = e^{3x}(C_1 + C_2 x + x^2) $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies 1\cdot(C_1 + 0 + 0) = 1 \implies C_1 = 1 $$
$$ y'_{о.н.} = 3e^{3x}(C_1 + C_2 x + x^2) + e^{3x}(C_2 + 2x) $$
$$ y'(0) = 3 \implies 3(C_1) + C_2 = 3 \implies 3 + C_2 = 3 \implies C_2 = 0 $$
<br><strong>Ответ:</strong>
$$ y = e^{3x}(x^2 + 1) $$`,

    // 4.6
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 16 = 0 \implies \lambda_{1,2} = \pm 4i $$
ФСР: $$ \cos 4x \text{, } \sin 4x $$
$$ y_{о.о.} = C_1 \cos 4x + C_2 \sin 4x $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 8\cos 4x \implies \alpha = 0, \beta = 4 \implies \alpha + \beta i = 4i \text{ (совпадает с корнем)} \implies S = 1 $$
$$ y_{ч.н.} = x(A\cos 4x + B\sin 4x) $$
<br>Считаем производные:
$$ y'_{ч.н.} = A\cos 4x + B\sin 4x + x(-4A\sin 4x + 4B\cos 4x) $$
$$ y''_{ч.н.} = -8A\sin 4x + 8B\cos 4x - 16x(A\cos 4x + B\sin 4x) $$
<br>Подставляем в $y'' + 16y = 8\cos 4x$:
$$ -8A\sin 4x + 8B\cos 4x - 16x(...) + 16x(...) = 8\cos 4x $$
$$ \begin{cases} -8A = 0 \implies A = 0 \\ 8B = 8 \implies B = 1 \end{cases} $$
$$ y_{ч.н.} = x\sin 4x $$
<br>Общее решение:
$$ y_{о.н.} = C_1 \cos 4x + C_2 \sin 4x + x\sin 4x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1\cdot 1 + 0 + 0 = 0 \implies C_1 = 0 $$
$$ y'_{о.н.} = -4C_1\sin 4x + 4C_2\cos 4x + \sin 4x + 4x\cos 4x $$
$$ y'(0) = 4 \implies 0 + 4C_2\cdot 1 + 0 + 0 = 4 \implies C_2 = 1 $$
<br><strong>Ответ:</strong>
$$ y = \sin 4x + x\sin 4x = (x + 1)\sin 4x $$`,

    // 4.7
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 1 = 0 \implies \lambda_{1,2} = \pm 1 $$
ФСР: $$ e^x \text{, } e^{-x} $$
$$ y_{о.о.} = C_1 e^x + C_2 e^{-x} $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4x e^x \implies \alpha = 1, \beta = 0 \implies \alpha + \beta i = 1 \text{ (совпадает с корнем)} \implies S = 1 $$
$$ y_{ч.н.} = x^1(Ax + B)e^x = (Ax^2 + Bx)e^x $$
<br>Считаем производные:
$$ y'_{ч.н.} = (2Ax + B)e^x + (Ax^2 + Bx)e^x = (Ax^2 + 2Ax + Bx + B)e^x $$
$$ y''_{ч.н.} = (2Ax + 2A + B)e^x + (Ax^2 + 2Ax + Bx + B)e^x = (Ax^2 + 4Ax + Bx + 2A + 2B)e^x $$
<br>Подставляем в $y'' - y = 4x e^x$:
$$ (Ax^2 + 4Ax + Bx + 2A + 2B)e^x - (Ax^2 + Bx)e^x = 4x e^x $$
$$ (4Ax + 2A + 2B)e^x = 4x e^x $$
$$ \begin{cases} 4A = 4 \implies A = 1 \\ 2A + 2B = 0 \implies B = -A = -1 \end{cases} $$
$$ y_{ч.н.} = (x^2 - x)e^x $$
<br>Общее решение:
$$ y_{о.н.} = C_1 e^x + C_2 e^{-x} + (x^2 - x)e^x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + C_2 + 0 = 0 \implies C_2 = -C_1 $$
$$ y'_{о.н.} = C_1 e^x - C_2 e^{-x} + (2x - 1)e^x + (x^2 - x)e^x $$
$$ y'(0) = 0 \implies C_1 - C_2 - 1 = 0 \implies C_1 - (-C_1) = 1 \implies 2C_1 = 1 \implies C_1 = \frac{1}{2}, C_2 = -\frac{1}{2} $$
<br><strong>Ответ:</strong>
$$ y = \frac{1}{2}e^x - \frac{1}{2}e^{-x} + (x^2 - x)e^x $$`,

    // 4.8
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 4\lambda + 5 = 0 \implies \mathcal{D} = 16 - 20 = -4 \implies \lambda_{1,2} = 2 \pm i $$
ФСР: $$ e^{2x}\cos x \text{, } e^{2x}\sin x $$
$$ y_{о.о.} = e^{2x}(C_1 \cos x + C_2 \sin x) $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = e^{2x}\sin x \implies \alpha = 2, \beta = 1 \implies \alpha + \beta i = 2 + i \text{ (резонанс)} \implies S = 1 $$
$$ y_{ч.н.} = x e^{2x}(A\cos x + B\sin x) $$
<br>Для резонансного случая с комплексным корнем при подстановке в уравнение останутся только определенные члены. Вычислим производные полностью:
$$ y'_{ч.н.} = e^{2x}(A\cos x + B\sin x) + 2x e^{2x}(A\cos x + B\sin x) + x e^{2x}(-A\sin x + B\cos x) $$
<br>После подстановки $y'' - 4y' + 5y$ и приведения подобных (стандартная формула для резонанса: $2e^{\alpha x}(-A\beta\sin\beta x + B\beta\cos\beta x)$):
$$ 2e^{2x}(-A\sin x + B\cos x) = e^{2x}\sin x $$
$$ \begin{cases} -2A = 1 \implies A = -\frac{1}{2} \\ 2B = 0 \implies B = 0 \end{cases} $$
$$ y_{ч.н.} = -\frac{1}{2}x e^{2x}\cos x $$
<br>Общее решение:
$$ y_{о.н.} = e^{2x}(C_1 \cos x + C_2 \sin x) - \frac{1}{2}x e^{2x}\cos x $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies 1\cdot(C_1\cdot 1 + 0) - 0 = 1 \implies C_1 = 1 $$
$$ y'_{о.н.} = 2e^{2x}(C_1\cos x + C_2\sin x) + e^{2x}(-C_1\sin x + C_2\cos x) - \frac{1}{2}e^{2x}\cos x - x e^{2x}\cos x + \frac{1}{2}x e^{2x}\sin x $$
$$ y'(0) = 2 \implies 2(C_1) + C_2 - \frac{1}{2} - 0 + 0 = 2 \implies 2 + C_2 - \frac{1}{2} = 2 \implies C_2 = \frac{1}{2} $$
<br><strong>Ответ:</strong>
$$ y = e^{2x}\left(\cos x + \frac{1}{2}\sin x - \frac{x}{2}\cos x\right) $$`,

    // 4.9
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 6\lambda + 9 = 0 \implies (\lambda + 3)^2 = 0 \implies \lambda = -3 \text{ (кр. 2)} $$
ФСР: $$ e^{-3x} \text{, } x e^{-3x} $$
$$ y_{о.о.} = (C_1 + C_2 x)e^{-3x} $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 18x \implies \alpha = 0, \beta = 0 \implies \alpha + \beta i = 0 \text{ (не корень)} \implies S = 0 $$
$$ y_{ч.н.} = Ax + B $$
<br>Считаем производные:
$$ y'_{ч.н.} = A \quad y''_{ч.н.} = 0 $$
<br>Подставляем в $y'' + 6y' + 9y = 18x$:
$$ 0 + 6A + 9(Ax + B) = 18x $$
$$ 9Ax + (6A + 9B) = 18x $$
$$ \begin{cases} 9A = 18 \implies A = 2 \\ 6A + 9B = 0 \implies 12 + 9B = 0 \implies B = -\frac{12}{9} = -\frac{4}{3} \end{cases} $$
$$ y_{ч.н.} = 2x - \frac{4}{3} $$
<br>Общее решение:
$$ y_{о.н.} = (C_1 + C_2 x)e^{-3x} + 2x - \frac{4}{3} $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies C_1 - \frac{4}{3} = 1 \implies C_1 = \frac{7}{3} $$
$$ y'_{о.н.} = C_2 e^{-3x} - 3(C_1 + C_2 x)e^{-3x} + 2 $$
$$ y'(0) = 0 \implies C_2 - 3C_1 + 2 = 0 \implies C_2 - 7 + 2 = 0 \implies C_2 = 5 $$
<br><strong>Ответ:</strong>
$$ y = \left(\frac{7}{3} + 5x\right)e^{-3x} + 2x - \frac{4}{3} $$`,

    // 4.10
    String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 4\lambda = 0 \implies \lambda(\lambda - 4) = 0 \implies \lambda_1 = 0, \lambda_2 = 4 $$
ФСР: $$ 1 \text{, } e^{4x} $$
$$ y_{о.о.} = C_1 + C_2 e^{4x} $$
<br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 16x \implies \alpha = 0, \beta = 0 \implies \alpha + \beta i = 0 \text{ (совпадает с корнем)} \implies S = 1 $$
$$ y_{ч.н.} = x^1(Ax + B) = Ax^2 + Bx $$
<br>Считаем производные:
$$ y'_{ч.н.} = 2Ax + B \quad y''_{ч.н.} = 2A $$
<br>Подставляем в $y'' - 4y' = 16x$:
$$ 2A - 4(2Ax + B) = 16x $$
$$ -8Ax + (2A - 4B) = 16x $$
$$ \begin{cases} -8A = 16 \implies A = -2 \\ 2A - 4B = 0 \implies -4 - 4B = 0 \implies B = -1 \end{cases} $$
$$ y_{ч.н.} = -2x^2 - x $$
<br>Общее решение:
$$ y_{о.н.} = C_1 + C_2 e^{4x} - 2x^2 - x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + C_2 = 0 \implies C_1 = -C_2 $$
$$ y'_{о.н.} = 4C_2 e^{4x} - 4x - 1 $$
$$ y'(0) = -4 \implies 4C_2 - 1 = -4 \implies 4C_2 = -3 \implies C_2 = -\frac{3}{4} \implies C_1 = \frac{3}{4} $$
<br><strong>Ответ:</strong>
$$ y = \frac{3}{4} - \frac{3}{4}e^{4x} - 2x^2 - x $$`
]


];
