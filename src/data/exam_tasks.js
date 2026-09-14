// examTasksData
const examTasksData = [
    {
        num: 1, title: 'Линейная алгебра',
        desc: 'матрица и определитель Грама, смена базиса, собственные векторы, ранг и дефект, квадратичные формы.',
        points: 20,
        tasks: [
            {
                label: '1.1', cond: 'Даны векторы: $\\bar{f}_1(1, -3, 2)$, $\\bar{f}_2(3, 2, -4)$, $\\bar{f}_3(4, 0, -1)$. Найти матрицу Грама и определитель Грама этой системы векторов.',
                answer: { matrix: [[14,-11,2],[-11,29,16],[2,16,17]], det: 441, inputLabel: 'Введите матрицу Грама:' },
                solution: `<strong>Решение:</strong><br><br>
$$ \\overline{f}_1(1, -3, 2),\\quad \\overline{f}_2(3, 2, -4),\\quad \\overline{f}_3(4, 0, -1) $$

<strong>Вычисляем скалярные произведения:</strong><br>
$$ (\\overline{f}_1; \\overline{f}_1) = 1^2 + (-3)^2 + 2^2 = 1 + 9 + 4 = 14 $$
$$ (\\overline{f}_1; \\overline{f}_2) = 1 \\cdot 3 + (-3) \\cdot 2 + 2 \\cdot (-4) = 3 - 6 - 8 = -11 $$
$$ (\\overline{f}_1; \\overline{f}_3) = 1 \\cdot 4 + (-3) \\cdot 0 + 2 \\cdot (-1) = 4 - 2 = 2 $$
$$ (\\overline{f}_2; \\overline{f}_2) = 3^2 + 2^2 + (-4)^2 = 9 + 4 + 16 = 29 $$
$$ (\\overline{f}_2; \\overline{f}_3) = 3 \\cdot 4 + 2 \\cdot 0 + (-4) \\cdot (-1) = 12 + 4 = 16 $$
$$ (\\overline{f}_3; \\overline{f}_3) = 4^2 + 0^2 + (-1)^2 = 16 + 1 = 17 $$

<strong>Матрица Грама:</strong><br>
$$ \\Gamma = \\begin{pmatrix} 14 & -11 & 2 \\\\ -11 & 29 & 16 \\\\ 2 & 16 & 17 \\end{pmatrix} $$

<strong>Определитель:</strong><br>
$$ |\\Gamma| = 14 \\cdot 29 \\cdot 17 - 22 \\cdot 16 - 32 \\cdot 11 - 29 \\cdot 4 - 256 \\cdot 14 - 121 \\cdot 17 = 441 $$

<br><strong>Ответ:</strong> $$ \\Gamma = \\begin{pmatrix} 14 & -11 & 2 \\\\ -11 & 29 & 16 \\\\ 2 & 16 & 17 \\end{pmatrix}, \\quad |\\Gamma| = 441.$$`
            },
            {
                label: '1.2', analogyOf: 1, cond: 'Даны координаты векторов в некотором ОНБ: $\\overline{f}_1(1, 0, 2, -1)$, $\\overline{f}_2(2, 1, 0, 3)$, $\\overline{f}_3(-1, 3, 2, 1)$, $\\overline{f}_4(0, -1, 3, 2)$. Найти матрицу Грама и определитель Грама.',
                answer: { matrix: [[6,-1,2,4],[-1,14,4,5],[2,4,15,5],[4,5,5,14]], det: 4356, inputLabel: 'Введите матрицу Грама:' },
                solution: `<strong>Решение:</strong><br><br>
$$ \\overline{f}_1(1, 0, 2, -1),\\quad \\overline{f}_2(2, 1, 0, 3),\\quad \\overline{f}_3(-1, 3, 2, 1),\\quad \\overline{f}_4(0, -1, 3, 2) $$

<strong>Вычисляем скалярные произведения:</strong><br>
$$ (f_1; f_1) = 1^2 + 0^2 + 2^2 + (-1)^2 = 1 + 4 + 1 = 6 $$
$$ (f_1; f_2) = 1 \\cdot 2 + 0 \\cdot 1 + 2 \\cdot 0 + (-1) \\cdot 3 = 2 - 3 = -1 $$
$$ (f_1; f_3) = 1 \\cdot (-1) + 0 \\cdot 3 + 2 \\cdot 2 + (-1) \\cdot 1 = -1 + 4 - 1 = 2 $$
$$ (f_1; f_4) = 1 \\cdot 0 + 0 \\cdot (-1) + 2 \\cdot 3 + (-1) \\cdot 2 = 6 - 2 = 4 $$
$$ (f_2; f_2) = 2^2 + 1^2 + 0^2 + 3^2 = 4 + 1 + 9 = 14 $$
$$ (f_2; f_3) = 2 \\cdot (-1) + 1 \\cdot 3 + 0 \\cdot 2 + 3 \\cdot 1 = -2 + 3 + 3 = 4 $$
$$ (f_2; f_4) = 2 \\cdot 0 + 1 \\cdot (-1) + 0 \\cdot 3 + 3 \\cdot 2 = -1 + 6 = 5 $$
$$ (f_3; f_3) = (-1)^2 + 3^2 + 2^2 + 1^2 = 1 + 9 + 4 + 1 = 15 $$
$$ (f_3; f_4) = -1 \\cdot 0 + 3 \\cdot (-1) + 2 \\cdot 3 + 1 \\cdot 2 = -3 + 6 + 2 = 5 $$
$$ (f_4; f_4) = 0^2 + (-1)^2 + 3^2 + 2^2 = 1 + 9 + 4 = 14 $$

<strong>Матрица Грама:</strong><br>
$$ \\Gamma = \\begin{pmatrix} 6 & -1 & 2 & 4 \\\\ -1 & 14 & 4 & 5 \\\\ 2 & 4 & 15 & 5 \\\\ 4 & 5 & 5 & 14 \\end{pmatrix} $$

<strong>Определитель:</strong><br>
$$ |\\Gamma| = 4356 $$

<br><strong>Ответ:</strong> $$ \\Gamma = \\begin{pmatrix} 6 & -1 & 2 & 4 \\\\ -1 & 14 & 4 & 5 \\\\ 2 & 4 & 15 & 5 \\\\ 4 & 5 & 5 & 14 \\end{pmatrix}, \\quad |\\Gamma| = 4356.$$`
            },
            {
                label: '1.3', analogyOf: 1, cond: 'Даны координаты векторов в некотором ОНБ: $\\bar{f}_1(2, -1, 3)$, $\\bar{f}_2(0, 4, -2)$. Найти матрицу Грама и определитель Грама.',
                answer: { matrix: [[14,-10],[-10,20]], det: 180, inputLabel: 'Введите матрицу Грама:' },
                solution: `<strong>Решение:</strong><br><br>
$$ \\overline{f}_1(2, -1, 3),\\quad \\overline{f}_2(0, 4, -2) $$

<strong>Вычисляем скалярные произведения:</strong><br>
$$ (f_1; f_1) = 2^2 + (-1)^2 + 3^2 = 4 + 1 + 9 = 14 $$
$$ (f_2; f_2) = 0^2 + 4^2 + (-2)^2 = 16 + 4 = 20 $$
$$ (f_1; f_2) = 2 \\cdot 0 + (-1) \\cdot 4 + 3 \\cdot (-2) = -4 - 6 = -10 $$

<strong>Матрица Грама:</strong><br>
$$ \\Gamma = \\begin{pmatrix} 14 & -10 \\\\ -10 & 20 \\end{pmatrix} $$

<strong>Определитель:</strong><br>
$$ |\\Gamma| = 14 \\cdot 20 - (-10) \\cdot (-10) = 280 - 100 = 180 $$

<br><strong>Ответ:</strong> $$ \\Gamma = \\begin{pmatrix} 14 & -10 \\\\ -10 & 20 \\end{pmatrix}, \\quad |\\Gamma| = 180.$$`
            },
            {
                label: '2.1', cond: 'Матрица оператора $\\hat{A}$ в базисе $\\text{Б} = (\\bar{e}_1, \\bar{e}_2)$ имеет вид: $$ [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} -3 & 2 \\\\ 1 & -1 \\end{pmatrix} $$ Найти матрицу оператора $\\hat{A}$ в базисе $\\text{Б}\' = (2\\bar{e}_1 + \\bar{e}_2, \\bar{e}_2 - \\bar{e}_1)$.',
                answer: { matrix: [[-1,1],[2,-3]], showDet: false, inputLabel: 'Введите матрицу оператора $[\\hat{A}]_{\\text{Б}\'} =$' },
                solution: `<strong>Решение:</strong><br><br>
1. Координаты нового базиса в старом:<br>
$\\bar{e}\'_1 = 2\\bar{e}_1 + \\bar{e}_2 \\Rightarrow [\\bar{e}\'_1]_{\\text{Б}} = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$<br>
$\\bar{e}\'_2 = -\\bar{e}_1 + \\bar{e}_2 \\Rightarrow [\\bar{e}\'_2]_{\\text{Б}} = \\begin{pmatrix} -1 \\\\ 1 \\end{pmatrix}$<br><br>
2. Матрица перехода $T_{\\text{Б}\' \\to \\text{Б}}$ (столбцы — координаты нового базиса в старом):<br>
$$ T_{\\text{Б}\' \\to \\text{Б}} = \\begin{pmatrix} 2 & -1 \\\\ 1 & 1 \\end{pmatrix} $$<br>
3. Обратная матрица $T_{\\text{Б} \\to \\text{Б}\'}$:<br>
$$ |T| = 2 \\cdot 1 - (-1) \\cdot 1 = 3 $$
$$ T_{\\text{Б} \\to \\text{Б}\'} = \\frac{1}{3} \\begin{pmatrix} 1 & 1 \\\\ -1 & 2 \\end{pmatrix} $$<br>
4. Формула $[\\hat{A}]_{\\text{Б}\'} = T_{\\text{Б} \\to \\text{Б}\'} \\cdot [\\hat{A}]_{\\text{Б}} \\cdot T_{\\text{Б}\' \\to \\text{Б}}$:<br>
$$ T_{\\text{Б} \\to \\text{Б}\'} \\cdot [\\hat{A}]_{\\text{Б}} = \\frac{1}{3} \\begin{pmatrix} 1 & 1 \\\\ -1 & 2 \\end{pmatrix} \\begin{pmatrix} -3 & 2 \\\\ 1 & -1 \\end{pmatrix} = \\frac{1}{3} \\begin{pmatrix} -2 & 1 \\\\ 5 & -4 \\end{pmatrix} $$
$$ [\\hat{A}]_{\\text{Б}\'} = \\frac{1}{3} \\begin{pmatrix} -2 & 1 \\\\ 5 & -4 \\end{pmatrix} \\begin{pmatrix} 2 & -1 \\\\ 1 & 1 \\end{pmatrix} = \\frac{1}{3} \\begin{pmatrix} -3 & 3 \\\\ 6 & -9 \\end{pmatrix} = \\begin{pmatrix} -1 & 1 \\\\ 2 & -3 \\end{pmatrix} $$
<br><strong>Ответ:</strong> $$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} -1 & 1 \\\\ 2 & -3 \\end{pmatrix}.$$`
            },
            {
                label: '2.2', analogyOf: 4, cond: 'Матрица оператора $\\hat{A}$ в базисе $\\text{Б} = (\\bar{e}_1, \\bar{e}_2)$ имеет вид: $$ [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} 5 & -1 \\\\ 0 & 2 \\end{pmatrix} $$ Найти матрицу оператора $\\hat{A}$ в базисе $\\text{Б}\' = (3\\bar{e}_1 + 2\\bar{e}_2, \\bar{e}_1 - \\bar{e}_2)$.',
                answer: { matrix: [[17/5,4/5],[14/5,18/5]], showDet: false, inputLabel: 'Введите матрицу оператора $[\\hat{A}]_{\\text{Б}\'} =$' },
                solution: `<strong>Решение:</strong><br><br>
1. Координаты нового базиса в старом:<br>
$\\bar{e}\'_1 = 3\\bar{e}_1 + 2\\bar{e}_2 \\Rightarrow [\\bar{e}\'_1]_{\\text{Б}} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$<br>
$\\bar{e}\'_2 = \\bar{e}_1 - \\bar{e}_2 \\Rightarrow [\\bar{e}\'_2]_{\\text{Б}} = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$<br><br>
2. Матрица перехода $T_{\\text{Б}\' \\to \\text{Б}}$ (столбцы — координаты нового базиса в старом):<br>
$$ T_{\\text{Б}\' \\to \\text{Б}} = \\begin{pmatrix} 3 & 1 \\\\ 2 & -1 \\end{pmatrix} $$<br>
3. Обратная матрица $T_{\\text{Б} \\to \\text{Б}\'}$:<br>
$$ |T| = 3 \\cdot (-1) - 1 \\cdot 2 = -5 $$
$$ T_{\\text{Б} \\to \\text{Б}\'} = \\frac{1}{-5} \\begin{pmatrix} -1 & -1 \\\\ -2 & 3 \\end{pmatrix} = \\begin{pmatrix} \\frac{1}{5} & \\frac{1}{5} \\\\ \\frac{2}{5} & -\\frac{3}{5} \\end{pmatrix} $$<br>
4. Формула $[\\hat{A}]_{\\text{Б}\'} = T_{\\text{Б} \\to \\text{Б}\'} \\cdot [\\hat{A}]_{\\text{Б}} \\cdot T_{\\text{Б}\' \\to \\text{Б}}$:<br>
$$ T_{\\text{Б} \\to \\text{Б}\'} \\cdot [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} \\frac{1}{5} & \\frac{1}{5} \\\\ \\frac{2}{5} & -\\frac{3}{5} \\end{pmatrix} \\begin{pmatrix} 5 & -1 \\\\ 0 & 2 \\end{pmatrix} = \\begin{pmatrix} 1 & \\frac{1}{5} \\\\ 2 & -\\frac{8}{5} \\end{pmatrix} $$
$$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} 1 & \\frac{1}{5} \\\\ 2 & -\\frac{8}{5} \\end{pmatrix} \\cdot \\begin{pmatrix} 3 & 1 \\\\ 2 & -1 \\end{pmatrix} = \\begin{pmatrix} \\frac{17}{5} & \\frac{4}{5} \\\\ \\frac{14}{5} & \\frac{18}{5} \\end{pmatrix} $$
<strong>Ответ:</strong> $$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} \\frac{17}{5} & \\frac{4}{5} \\\\ \\frac{14}{5} & \\frac{18}{5} \\end{pmatrix}.$$`
            },
            {
                label: '2.3', analogyOf: 4, cond: 'Матрица оператора $\\hat{A}$ в базисе $\\text{Б} = (\\bar{e}_1, \\bar{e}_2)$ имеет вид: $$ [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} 1 & 4 \\\\ -2 & 0 \\end{pmatrix} $$ Найти матрицу оператора $\\hat{A}$ в базисе $\\text{Б}\' = (\\bar{e}_1 + 3\\bar{e}_2, 2\\bar{e}_1 + \\bar{e}_2)$.',
                answer: { matrix: [[-17/5,-14/5],[41/5,22/5]], showDet: false, inputLabel: 'Введите матрицу оператора $[\\hat{A}]_{\\text{Б}\'} =$' },
                solution: `<strong>Решение:</strong><br><br>
1. Координаты нового базиса в старом:<br>
$\\bar{e}\'_1 = \\bar{e}_1 + 3\\bar{e}_2 \\Rightarrow [\\bar{e}\'_1]_{\\text{Б}} = \\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$<br>
$\\bar{e}\'_2 = 2\\bar{e}_1 + \\bar{e}_2 \\Rightarrow [\\bar{e}\'_2]_{\\text{Б}} = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$<br><br>
2. Матрица перехода $T_{\\text{Б}\' \\to \\text{Б}}$ (столбцы — координаты нового базиса в старом):<br>
$$ T_{\\text{Б}\' \\to \\text{Б}} = \\begin{pmatrix} 1 & 2 \\\\ 3 & 1 \\end{pmatrix} $$<br>
3. Обратная матрица $T_{\\text{Б} \\to \\text{Б}\'}$:<br>
$$ |T| = 1 \\cdot 1 - 2 \\cdot 3 = -5 $$
$$ T_{\\text{Б} \\to \\text{Б}\'} = \\frac{1}{-5} \\begin{pmatrix} 1 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -\\frac{1}{5} & \\frac{2}{5} \\\\ \\frac{3}{5} & -\\frac{1}{5} \\end{pmatrix} $$<br>
4. Формула $[\\hat{A}]_{\\text{Б}\'} = T_{\\text{Б} \\to \\text{Б}\'} \\cdot [\\hat{A}]_{\\text{Б}} \\cdot T_{\\text{Б}\' \\to \\text{Б}}$:<br>
$$ T_{\\text{Б} \\to \\text{Б}\'} \\cdot [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} -\\frac{1}{5} & \\frac{2}{5} \\\\ \\frac{3}{5} & -\\frac{1}{5} \\end{pmatrix} \\begin{pmatrix} 1 & 4 \\\\ -2 & 0 \\end{pmatrix} = \\begin{pmatrix} -1 & -\\frac{4}{5} \\\\ 1 & \\frac{12}{5} \\end{pmatrix} $$
$$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} -1 & -\\frac{4}{5} \\\\ 1 & \\frac{12}{5} \\end{pmatrix} \\cdot \\begin{pmatrix} 1 & 2 \\\\ 3 & 1 \\end{pmatrix} = \\begin{pmatrix} -\\frac{17}{5} & -\\frac{14}{5} \\\\ \\frac{41}{5} & \\frac{22}{5} \\end{pmatrix} $$
<strong>Ответ:</strong> $$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} -\\frac{17}{5} & -\\frac{14}{5} \\\\ \\frac{41}{5} & \\frac{22}{5} \\end{pmatrix}.$$`
            },
            {
                label: '3.1', cond: 'Найти собственные векторы-столбцы матрицы, соответствующие $\\lambda = 1$: $$ A = \\begin{pmatrix} 9 & -8 & 4 \\\\ 8 & -7 & 4 \\\\ 4 & -4 & 3 \\end{pmatrix} $$',
                answer: { vectors: [[1,1,0],[1,0,-2]], dim: 2, checkSubspace: true, inputLabel: 'Введите базис собственных векторов (ФСР = 2 вектора):' },
                solution: `<strong>Решение:</strong><br><br>
$$ A - E = \\begin{pmatrix} 8 & -8 & 4 \\\\ 8 & -8 & 4 \\\\ 4 & -4 & 2 \\end{pmatrix} \\sim \\begin{pmatrix} 8 & -8 & 4 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} $$
$$ x_1 - x_2 + \\frac{1}{2}x_3 = 0 $$
$$ x_1 = x_2 - \\frac{1}{2}x_3 $$
ФСР: $\\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix},\\quad \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}$
<br><strong>Ответ:</strong> $$ \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix}_{\\lambda=1} = \\alpha_1 \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} + \\alpha_2 \\cdot \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix},\\quad \\alpha_1^2 + \\alpha_2^2 > 0.$$`
            },
            {
                label: '3.2', analogyOf: 3, cond: 'Найти собственные векторы-столбцы матрицы, соответствующие $\\lambda = 3$: $$ A = \\begin{pmatrix} 5 & 2 & 0 \\\\ 2 & 2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix} $$',
                answer: { vectors: [[0,0,1]], dim: 1, checkSubspace: true, inputLabel: 'Введите базис собственных векторов (ФСР = 1 вектор):' },
                solution: `<strong>Решение:</strong><br><br>
$$ A - 3E = \\begin{pmatrix} 2 & 2 & 0 \\\\ 2 & -1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\sim \\begin{pmatrix} 2 & 2 & 0 \\\\ 0 & -3 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\sim \\begin{pmatrix} 2 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\sim \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} $$
ФСР: $\\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix}$
<br><strong>Ответ:</strong> $$ \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix}_{\\lambda=3} = \\alpha \\cdot \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix},\\quad \\alpha \\neq 0.$$`
            },
            {
                label: '3.3', analogyOf: 3, cond: 'Найти собственные векторы-столбцы матрицы, соответствующие $\\lambda = 2$: $$ A = \\begin{pmatrix} 3 & 1 & -1 \\\\ 0 & 2 & 0 \\\\ 1 & 1 & 1 \\end{pmatrix} $$',
                answer: { vectors: [[-1,1,0],[1,0,1]], dim: 2, checkSubspace: true, inputLabel: 'Введите базис собственных векторов (ФСР = 2 вектора):' },
                solution: `<strong>Решение:</strong><br><br>
$$ A - 2E = \\begin{pmatrix} 1 & 1 & -1 \\\\ 0 & 0 & 0 \\\\ 1 & 1 & -1 \\end{pmatrix} \\sim \\begin{pmatrix} 1 & 1 & -1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} $$
$$ x_1 = x_3 - x_2 $$
ФСР: $\\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix},\\quad \\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix}$
<br><strong>Ответ:</strong> $$ \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix}_{\\lambda=2} = \\alpha_1 \\cdot \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} + \\alpha_2 \\cdot \\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix},\\quad \\alpha_1^2 + \\alpha_2^2 > 0.$$`
            },
            {
                label: '4.1', cond: 'Найти ранг ($r$) и дефект ($d$) оператора с матрицей: $$ A = \\begin{pmatrix} 1 & -2 & -3 & -4 \\\\ 6 & 1 & 0 & -1 \\\\ 4 & 5 & 6 & 7 \\\\ 9 & 8 & 9 & 11 \\end{pmatrix} $$',
                answer: { rank: 3, defect: 1, inputLabel: 'Введите ранг и дефект:' },
                solution: `<strong>Решение:</strong><br><br>
Приводим к ступенчатому виду методом Гаусса.<br><br>
$$ A = \\begin{pmatrix} 1 & -2 & -3 & -4 \\\\ 6 & 1 & 0 & -1 \\\\ 4 & 5 & 6 & 7 \\\\ 9 & 8 & 9 & 11 \\end{pmatrix} $$<br>
<strong>Шаг 1.</strong> Обнуляем 1-й столбец:<br>
$$ R_2 \\to R_2 - 6R_1, \\quad R_3 \\to R_3 - 4R_1, \\quad R_4 \\to R_4 - 9R_1 $$
$$ A \\sim \\begin{pmatrix} 1 & -2 & -3 & -4 \\\\ 0 & 13 & 18 & 23 \\\\ 0 & 13 & 18 & 23 \\\\ 0 & 26 & 36 & 47 \\end{pmatrix} $$<br>
<strong>Шаг 2.</strong> Обнуляем 2-й столбец:<br>
$$ R_3 \\to R_3 - R_2, \\quad R_4 \\to R_4 - 2R_2 $$
$$ A \\sim \\begin{pmatrix} 1 & -2 & -3 & -4 \\\\ 0 & 13 & 18 & 23 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} $$<br>
<strong>Шаг 3.</strong> Переставляем строки 3 и 4:<br>
$$ A \\sim \\begin{pmatrix} 1 & -2 & -3 & -4 \\\\ 0 & 13 & 18 & 23 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix} $$<br>
$r = 3$, $d = 4 - 3 = 1$.<br>
<strong>Ответ:</strong> $r = 3,\\; d = 1$.`
            },
            {
                label: '4.2', analogyOf: 10, cond: 'Найти ранг ($r$) и дефект ($d$) оператора с матрицей: $$ A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 3 & 6 & 9 \\end{pmatrix} $$',
                answer: { rank: 1, defect: 2, inputLabel: 'Введите ранг и дефект:' },
                solution: `<strong>Решение:</strong><br><br>
$$ A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 3 & 6 & 9 \\end{pmatrix} $$<br>
<strong>Шаг 1.</strong> Обнуляем 1-й столбец:<br>
$$ R_2 \\to R_2 - 2R_1, \\quad R_3 \\to R_3 - 3R_1 $$
$$ A \\sim \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} $$<br>
$r = 1$, $d = 3 - 1 = 2$.<br>
<strong>Ответ:</strong> $r = 1,\\; d = 2$.`
            },
            {
                label: '4.3', analogyOf: 10, cond: 'Найти ранг ($r$) и дефект ($d$) оператора с матрицей: $$ A = \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 4 & 6 & 8 \\\\ 3 & 1 & 0 & 1 \\\\ 1 & 3 & 2 & 1 \\end{pmatrix} $$',
                answer: { rank: 3, defect: 1, inputLabel: 'Введите ранг и дефект:' },
                solution: `<strong>Решение:</strong><br><br>
$$ A = \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 4 & 6 & 8 \\\\ 3 & 1 & 0 & 1 \\\\ 1 & 3 & 2 & 1 \\end{pmatrix} $$<br>
<strong>Шаг 1.</strong> Обнуляем 1-й столбец:<br>
$$ R_2 \\to R_2 - 2R_1, \\quad R_3 \\to R_3 - 3R_1, \\quad R_4 \\to R_4 - R_1 $$
$$ A \\sim \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & -5 & -9 & -11 \\\\ 0 & 1 & -1 & -3 \\end{pmatrix} $$<br>
<strong>Шаг 2.</strong> Переставляем $R_2 \\leftrightarrow R_4$:<br>
$$ A \\sim \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 1 & -1 & -3 \\\\ 0 & -5 & -9 & -11 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix} $$<br>
<strong>Шаг 3.</strong> Обнуляем 2-й столбец:<br>
$$ R_3 \\to R_3 + 5R_2 $$
$$ A \\sim \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 1 & -1 & -3 \\\\ 0 & 0 & -14 & -26 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix} $$<br>
$r = 3$, $d = 4 - 3 = 1$.<br>
<strong>Ответ:</strong> $r = 3,\\; d = 1$.`
            },
            {
                label: '5.1', cond: 'Исследовать на знакоопределённость: $f(x, y, z) = 4x^2 + 2y^2 + z^2 - 4xy - 2yz$.',
                answer: { sign: 'положительно полуопределена, но не положительно определена', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} 4 & -2 & 0 \\\\ -2 & 2 & -1 \\\\ 0 & -1 & 1 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = 4 > 0 $$
$$ \\Delta_2 = \\begin{vmatrix} 4 & -2 \\\\ -2 & 2 \\end{vmatrix} = 4 \\cdot 2 - (-2) \\cdot (-2) = 8 - 4 = 4 > 0 $$
$$ \\Delta_3 = \\det A = 4 \\cdot (2 \\cdot 1 - (-1) \\cdot (-1)) - (-2) \\cdot ((-2) \\cdot 1 - 0 \\cdot (-1)) + 0 $$
$$ = 4 \\cdot (2 - 1) + 2 \\cdot (-2) = 4 - 4 = 0 $$<br>
<strong>Все главные миноры:</strong><br>
$$ M_{11} = 4 > 0, \\quad M_{22} = 2 > 0, \\quad M_{33} = 1 > 0 $$
$$ M_{12} = \\begin{vmatrix} 4 & -2 \\\\ -2 & 2 \\end{vmatrix} = 4 > 0, \\quad M_{13} = \\begin{vmatrix} 4 & 0 \\\\ 0 & 1 \\end{vmatrix} = 4 > 0, \\quad M_{23} = \\begin{vmatrix} 2 & -1 \\\\ -1 & 1 \\end{vmatrix} = 1 > 0 $$
$$ \\Delta_3 = 0 $$<br>
<strong>Вывод:</strong> Все главные миноры $\\geq 0$, причём $\\Delta_3 = 0$ — форма не знакоопределённая.<br>
$$ \\Delta_1 > 0, \\quad \\Delta_2 > 0, \\quad \\Delta_3 = 0 $$
<strong>Ответ:</strong> положительно полуопределена, но не положительно определена.`
            },
            {
                label: '5.2', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = 3x^2 + 5y^2 + 2z^2 + 2xy + 4xz$.',
                answer: { sign: 'положительно определённая', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} 3 & 1 & 2 \\\\ 1 & 5 & 0 \\\\ 2 & 0 & 2 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = 3 > 0 $$
$$ \\Delta_2 = \\begin{vmatrix} 3 & 1 \\\\ 1 & 5 \\end{vmatrix} = 3 \\cdot 5 - 1 \\cdot 1 = 15 - 1 = 14 > 0 $$
$$ \\Delta_3 = \\det A = 3 \\cdot 5 \\cdot 2 + 1 \\cdot 0 \\cdot 2 + 2 \\cdot 1 \\cdot 0 - (2 \\cdot 5 \\cdot 2 + 3 \\cdot 0 \\cdot 0 + 1 \\cdot 1 \\cdot 2) $$
$$ = 30 + 0 + 0 - (20 + 0 + 2) = 30 - 22 = 8 > 0 $$<br>
<strong>Вывод:</strong> $\\Delta_1 > 0, \\; \\Delta_2 > 0, \\; \\Delta_3 > 0$ — положительно определённая.<br>
<strong>Ответ:</strong> положительно определённая.`
            },
            {
                label: '5.3', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = -2x^2 - 4y^2 - 5z^2 + 2xy + 4xz + 2yz$.',
                answer: { sign: 'отрицательно определённая', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} -2 & 1 & 2 \\\\ 1 & -4 & 1 \\\\ 2 & 1 & -5 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = -2 < 0 $$
$$ \\Delta_2 = \\begin{vmatrix} -2 & 1 \\\\ 1 & -4 \\end{vmatrix} = (-2) \\cdot (-4) - 1 \\cdot 1 = 8 - 1 = 7 > 0 $$
$$ \\Delta_3 = \\det A = (-2) \\cdot (-4) \\cdot (-5) + 1 \\cdot 1 \\cdot 2 + 2 \\cdot 1 \\cdot 1 - (2 \\cdot (-4) \\cdot 2 + (-2) \\cdot 1 \\cdot 1 + 1 \\cdot 1 \\cdot (-5)) $$
$$ = -40 + 2 + 2 - (-16 - 2 - 5) = -36 + 23 = -13 < 0 $$<br>
<strong>Вывод:</strong> $\\Delta_1 < 0, \\; \\Delta_2 > 0, \\; \\Delta_3 < 0$ — отрицательно определённая.<br>
<strong>Ответ:</strong> отрицательно определённая.`
            },
            {
                label: '5.4', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = 5x^2 + 2y^2 - z^2 - 4xy - 2yz$.',
                answer: { sign: 'знакопеременная', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} 5 & -2 & 0 \\\\ -2 & 2 & -1 \\\\ 0 & -1 & -1 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = 5 > 0 $$
$$ \\Delta_2 = \\begin{vmatrix} 5 & -2 \\\\ -2 & 2 \\end{vmatrix} = 10 - 4 = 6 > 0 $$
$$ \\Delta_3 = \\det A = 5(2 \\cdot (-1) - (-1)(-1)) - (-2)((-2) \\cdot (-1) - (-1) \\cdot 0) + 0 $$
$$ = 5(-2 - 1) + 2(2) = -15 + 4 = -11 < 0 $$<br>
<strong>Вывод:</strong> $\\Delta_1 > 0, \\; \\Delta_2 > 0, \\; \\Delta_3 < 0$ — знакопеременная.<br>
<strong>Ответ:</strong> знакопеременная.`
            },
            {
                label: '5.5', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = 2y^2 + z^2 - 4xy - 2yz$.',
                answer: { sign: 'знакопеременная', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} 0 & -2 & 0 \\\\ -2 & 2 & -1 \\\\ 0 & -1 & 1 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = 0 $$
$$ \\Delta_2 = \\begin{vmatrix} 0 & -2 \\\\ -2 & 2 \\end{vmatrix} = 0 \\cdot 2 - (-2) \\cdot (-2) = -4 < 0 $$
$$ \\Delta_3 = \\det A = 0 \\cdot 2 \\cdot 1 + (-2) \\cdot (-1) \\cdot 0 + 0 \\cdot (-2) \\cdot (-1) - (0 \\cdot 2 \\cdot 0 + (-1) \\cdot (-2) \\cdot 0 + 1 \\cdot (-2) \\cdot (-2)) $$
$$ = 0 + 0 + 0 - (0 + 0 + 4) = -4 \\neq 0 $$<br>
<strong>Вывод:</strong> $\\Delta_1 = 0, \\; \\Delta_2 < 0$ — знакопеременная.<br>
<strong>Ответ:</strong> знакопеременная.`
            },
            {
                label: '5.6', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = -x^2 - y^2 - z^2 - 2xy - 2xz - 2yz$.',
                answer: { sign: 'отрицательно полуопределена, но не отрицательно определена', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} -1 & -1 & -1 \\\\ -1 & -1 & -1 \\\\ -1 & -1 & -1 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = -1 < 0 $$
$$ \\Delta_2 = \\begin{vmatrix} -1 & -1 \\\\ -1 & -1 \\end{vmatrix} = 1 - 1 = 0 $$
$$ \\Delta_3 = \\det A = 0 $$<br>
<strong>Все главные миноры:</strong><br>
$$ M_{11} = -1 < 0, \\quad M_{22} = -1 < 0, \\quad M_{33} = -1 < 0 $$
$$ M_{12} = \\begin{vmatrix} -1 & -1 \\\\ -1 & -1 \\end{vmatrix} = 0, \\quad M_{13} = \\begin{vmatrix} -1 & -1 \\\\ -1 & -1 \\end{vmatrix} = 0, \\quad M_{23} = \\begin{vmatrix} -1 & -1 \\\\ -1 & -1 \\end{vmatrix} = 0 $$
$$ \\Delta_3 = 0 $$<br>
<strong>Вывод:</strong> Все главные миноры $\\leq 0$, причём $\\Delta_3 = 0$ — форма не знакоопределённая.<br>
$$ \\Delta_1 < 0, \\quad \\Delta_2 = 0, \\quad \\Delta_3 = 0 $$
<strong>Ответ:</strong> отрицательно полуопределена, но не отрицательно определена.`
            },
            {
                label: '5.7', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = 3x^2 - y^2 + 2z^2 + 4xy + 6xz$.',
                answer: { sign: 'знакопеременная', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} 3 & 2 & 3 \\\\ 2 & -1 & 0 \\\\ 3 & 0 & 2 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = 3 > 0 $$
$$ \\Delta_2 = \\begin{vmatrix} 3 & 2 \\\\ 2 & -1 \\end{vmatrix} = 3(-1) - 2(2) = -3 - 4 = -7 < 0 $$
$$ \\Delta_3 = \\det A = 3(-1)2 + 2(0)(3) + 3(2)(0) - (3(-1)(3) + 0(2)(3) + 2(2)(2)) $$
$$ = -6 + 0 + 0 - (-9 + 0 + 8) = -6 - (-1) = -5 < 0 $$<br>
<strong>Вывод:</strong> $\\Delta_1 > 0$, $\\Delta_2 < 0$, $\\Delta_3 < 0$ — знакопеременная.<br>
<strong>Ответ:</strong> знакопеременная.`
            },
            {
                label: '5.8', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = x^2 + z^2 + 4xz$.',
                answer: { sign: 'знакопеременная', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Матрица:</strong><br>
$$ A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 2 & 0 & 1 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = 1 > 0 $$
$$ \\Delta_2 = \\begin{vmatrix} 1 & 0 \\\\ 0 & 0 \\end{vmatrix} = 0 $$
$$ \\Delta_3 = \\det A = 0 $$<br>
$$ \\Delta_2 = 0 $$ — критерий Сильвестра не даёт ответа.<br>
Проверяем минор 2-го порядка, не содержащий первую строку и первый столбец:<br>
$$ M = \\begin{vmatrix} 1 & 2 \\\\ 2 & 1 \\end{vmatrix} = 1 - 4 = -3 < 0 $$
Так как $\\Delta_1 > 0$, но есть минор 2-го порядка $< 0$ — форма знакопеременная.<br>
<strong>Ответ:</strong> знакопеременная.`
            },
            {
                label: '1.4', source: 'Основная волна', analogyOf: 1, cond: 'Даны координаты векторов в некотором ОНБ: $\\bar{f}_1(4, -1, 2)$, $\\bar{f}_2(1, 0, 4)$, $\\bar{f}_3(-3, -2, -1)$. Найти матрицу Грама и определитель Грама.',
                answer: { matrix: [[21,12,-12],[12,17,-7],[-12,-7,14]], det: 1521, inputLabel: 'Введите матрицу Грама:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Вычисляем скалярные произведения:</strong><br>
$$ g_{11} = \\bar{f}_1 \\cdot \\bar{f}_1 = 4 \\cdot 4 + (-1) \\cdot (-1) + 2 \\cdot 2 = 16 + 1 + 4 = 21 $$
$$ g_{22} = \\bar{f}_2 \\cdot \\bar{f}_2 = 1 \\cdot 1 + 0 \\cdot 0 + 4 \\cdot 4 = 1 + 0 + 16 = 17 $$
$$ g_{33} = \\bar{f}_3 \\cdot \\bar{f}_3 = (-3) \\cdot (-3) + (-2) \\cdot (-2) + (-1) \\cdot (-1) = 9 + 4 + 1 = 14 $$
$$ g_{12} = \\bar{f}_1 \\cdot \\bar{f}_2 = 4 \\cdot 1 + (-1) \\cdot 0 + 2 \\cdot 4 = 4 + 0 + 8 = 12 $$
$$ g_{13} = \\bar{f}_1 \\cdot \\bar{f}_3 = 4 \\cdot (-3) + (-1) \\cdot (-2) + 2 \\cdot (-1) = -12 + 2 - 2 = -12 $$
$$ g_{23} = \\bar{f}_2 \\cdot \\bar{f}_3 = 1 \\cdot (-3) + 0 \\cdot (-2) + 4 \\cdot (-1) = -3 + 0 - 4 = -7 $$<br>
<strong>2. Матрица Грама:</strong><br>
$$ \\Gamma = \\begin{pmatrix} 21 & 12 & -12 \\\\ 12 & 17 & -7 \\\\ -12 & -7 & 14 \\end{pmatrix} $$<br>
<strong>3. Определитель Грама:</strong><br>
$$ \\det\\Gamma = 21 \\cdot 17 \\cdot 14 + 12 \\cdot (-7) \\cdot (-12) + (-12) \\cdot 12 \\cdot (-7) - ((-12) \\cdot 17 \\cdot (-12) + 21 \\cdot (-7) \\cdot (-7) + 12 \\cdot 12 \\cdot 14) $$
$$ = 4998 + 1008 + 1008 - (2448 + 1029 + 2016) = 7014 - 5493 = 1521 $$<br>
<strong>Ответ:</strong> матрица Грама $\\Gamma = \\begin{pmatrix} 21 & 12 & -12 \\\\ 12 & 17 & -7 \\\\ -12 & -7 & 14 \\end{pmatrix}$, $\\det\\Gamma = 1521$.`
            },
            {
                label: '2.4', source: 'Основная волна', analogyOf: 4, cond: 'Матрица оператора $\\hat{A}$ в базисе $\\text{Б} = (\\bar{e}_1, \\bar{e}_2)$ имеет вид: $$ [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} 1 & 5 \\\\ -1 & 2 \\end{pmatrix} $$ Найти матрицу оператора $\\hat{A}$ в базисе $\\text{Б}\' = (\\bar{e}_1 + 3\\bar{e}_2, 3\\bar{e}_2 - \\bar{e}_1)$.',
                answer: { matrix: [[53/6,49/6],[-43/6,-35/6]], showDet: false, inputLabel: 'Введите матрицу оператора $[\\hat{A}]_{\\text{Б}\'} =$' },
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Записываем векторы нового базиса:</strong><br>
$$ \\bar{e}\'_1 = \\bar{e}_1 + 3\\bar{e}_2 \\rightarrow (1, 3)^T $$
$$ \\bar{e}\'_2 = -\\bar{e}_1 + 3\\bar{e}_2 \\rightarrow (-1, 3)^T $$<br>
<strong>2. Матрица перехода:</strong><br>
$$ T = \\begin{pmatrix} 1 & -1 \\\\ 3 & 3 \\end{pmatrix}, \\quad \\det T = 1 \\cdot 3 - (-1) \\cdot 3 = 3 + 3 = 6 $$<br>
<strong>3. Обратная матрица:</strong><br>
$$ T^{-1} = \\frac{1}{6} \\begin{pmatrix} 3 & 1 \\\\ -3 & 1 \\end{pmatrix} $$<br>
<strong>4. Формула преобразования:</strong><br>
$$ [\\hat{A}]_{\\text{Б}\'} = T^{-1} \\cdot [\\hat{A}]_{\\text{Б}} \\cdot T $$<br>
<strong>5. Вычисляем:</strong><br>
$$ T^{-1} \\cdot [\\hat{A}]_{\\text{Б}} = \\frac{1}{6} \\begin{pmatrix} 3 & 1 \\\\ -3 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 5 \\\\ -1 & 2 \\end{pmatrix} = \\frac{1}{6} \\begin{pmatrix} 2 & 17 \\\\ -4 & -13 \\end{pmatrix} $$<br>
$$ [\\hat{A}]_{\\text{Б}\'} = \\frac{1}{6} \\begin{pmatrix} 2 & 17 \\\\ -4 & -13 \\end{pmatrix} \\begin{pmatrix} 1 & -1 \\\\ 3 & 3 \\end{pmatrix} = \\frac{1}{6} \\begin{pmatrix} 53 & 49 \\\\ -43 & -35 \\end{pmatrix} $$<br>
<strong>Ответ:</strong> $$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} \\frac{53}{6} & \\frac{49}{6} \\\\ -\\frac{43}{6} & -\\frac{35}{6} \\end{pmatrix} $$`
            },
            {
                label: '2.5', source: 'Основная волна', analogyOf: 4, cond: 'Матрица оператора $\\hat{A}$ в базисе $\\text{Б} = (\\bar{e}_1, \\bar{e}_2)$ имеет вид: $$ [\\hat{A}]_{\\text{Б}} = \\begin{pmatrix} 5 & 1 \\\\ 2 & 4 \\end{pmatrix} $$ Найти матрицу оператора $\\hat{A}$ в базисе $\\text{Б}\' = (3\\bar{e}_1 + \\bar{e}_2, 2\\bar{e}_2 - 3\\bar{e}_1)$.',
                answer: { matrix: [[62/9,-20/9],[14/9,19/9]], showDet: false, inputLabel: 'Введите матрицу оператора $[\\hat{A}]_{\\text{Б}\'} =$' },
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Записываем векторы нового базиса:</strong><br>
$$ \\bar{e}\'_1 = 3\\bar{e}_1 + \\bar{e}_2 \\rightarrow (3, 1)^T $$
$$ \\bar{e}\'_2 = -3\\bar{e}_1 + 2\\bar{e}_2 \\rightarrow (-3, 2)^T $$<br>
<strong>2. Матрица перехода:</strong><br>
$$ T = \\begin{pmatrix} 3 & -3 \\\\ 1 & 2 \\end{pmatrix}, \\quad \\det T = 3 \\cdot 2 - (-3) \\cdot 1 = 6 + 3 = 9 $$<br>
<strong>3. Обратная матрица:</strong><br>
$$ T^{-1} = \\frac{1}{9} \\begin{pmatrix} 2 & 3 \\\\ -1 & 3 \\end{pmatrix} $$<br>
<strong>4. Формула преобразования:</strong><br>
$$ [\\hat{A}]_{\\text{Б}\'} = T^{-1} \\cdot [\\hat{A}]_{\\text{Б}} \\cdot T $$<br>
<strong>5. Вычисляем:</strong><br>
$$ T^{-1} \\cdot [\\hat{A}]_{\\text{Б}} = \\frac{1}{9} \\begin{pmatrix} 2 & 3 \\\\ -1 & 3 \\end{pmatrix} \\begin{pmatrix} 5 & 1 \\\\ 2 & 4 \\end{pmatrix} = \\frac{1}{9} \\begin{pmatrix} 16 & 14 \\\\ 1 & 11 \\end{pmatrix} $$<br>
$$ [\\hat{A}]_{\\text{Б}\'} = \\frac{1}{9} \\begin{pmatrix} 16 & 14 \\\\ 1 & 11 \\end{pmatrix} \\begin{pmatrix} 3 & -3 \\\\ 1 & 2 \\end{pmatrix} = \\frac{1}{9} \\begin{pmatrix} 62 & -20 \\\\ 14 & 19 \\end{pmatrix} $$<br>
<strong>Ответ:</strong> $$ [\\hat{A}]_{\\text{Б}\'} = \\begin{pmatrix} \\frac{62}{9} & -\\frac{20}{9} \\\\ \\frac{14}{9} & \\frac{19}{9} \\end{pmatrix} $$`
            },
            {
                label: '3.4', source: 'Основная волна', analogyOf: 7, cond: 'Найти собственные векторы-столбцы матрицы, соответствующие $\\lambda = 5$: $$ A = \\begin{pmatrix} 11 & 8 & 4 \\\\ -8 & -5 & -4 \\\\ 4 & 4 & 5 \\end{pmatrix} $$',
                answer: { vectors: [[2,-2,1]], dim: 1, checkSubspace: true, inputLabel: 'Введите базис собственных векторов (ФСР = 1 вектор):' },
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Находим $A - 5E$:</strong><br>
$$ A - 5E = \\begin{pmatrix} 11-5 & 8 & 4 \\\\ -8 & -5-5 & -4 \\\\ 4 & 4 & 5-5 \\end{pmatrix} = \\begin{pmatrix} 6 & 8 & 4 \\\\ -8 & -10 & -4 \\\\ 4 & 4 & 0 \\end{pmatrix} $$<br>
<strong>2. Решаем $(A - 5E)\\bar{x} = 0$ методом Гаусса:</strong><br>
$$ \\begin{pmatrix} 6 & 8 & 4 \\\\ -8 & -10 & -4 \\\\ 4 & 4 & 0 \\end{pmatrix} \\rightarrow \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix} $$<br>
<strong>3. Выражаем переменные:</strong><br>
$$ x_1 + x_2 = 0 \\Rightarrow x_1 = -x_2 $$
$$ x_2 + 2x_3 = 0 \\Rightarrow x_2 = -2x_3 $$
Пусть $x_3 = \\alpha$ (свободная переменная):<br>
$$ x_2 = -2\\alpha, \\quad x_1 = 2\\alpha $$<br>
<strong>Ответ:</strong> $$ \\bar{x} = \\alpha \\begin{pmatrix} 2 \\\\ -2 \\\\ 1 \\end{pmatrix},\\; \\alpha \\neq 0 $$`
            },
            {
                label: '4.4', source: 'Основная волна', analogyOf: 10, cond: 'Найти ранг ($r$) и дефект ($d$) оператора с матрицей: $$ A = \\begin{pmatrix} -4 & 5 & -6 & 8 \\\\ -6 & 1 & 0 & -1 \\\\ -1 & -2 & 3 & -4 \\\\ -9 & 8 & -9 & 11 \\end{pmatrix} $$',
                answer: { rank: 3, defect: 1, inputLabel: 'Введите ранг и дефект:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Приводим матрицу к ступенчатому виду:</strong><br>
$$ A = \\begin{pmatrix} -4 & 5 & -6 & 8 \\\\ -6 & 1 & 0 & -1 \\\\ -1 & -2 & 3 & -4 \\\\ -9 & 8 & -9 & 11 \\end{pmatrix} $$<br>
<strong>2. Шаг 1:</strong> меняем строки местами:<br>
$$ \\rightarrow \\begin{pmatrix} 1 & 2 & -3 & 4 \\\\ -6 & 1 & 0 & -1 \\\\ -4 & 5 & -6 & 8 \\\\ -9 & 8 & -9 & 11 \\end{pmatrix} $$<br>
<strong>3. Шаг 2:</strong> обнуляем первый столбец:<br>
$$ \\rightarrow \\begin{pmatrix} 1 & 2 & -3 & 4 \\\\ 0 & 13 & -18 & 23 \\\\ 0 & 13 & -18 & 24 \\\\ 0 & 26 & -36 & 47 \\end{pmatrix} $$<br>
<strong>4. Шаг 3:</strong> вычитаем строки:<br>
$$ \\rightarrow \\begin{pmatrix} 1 & 2 & -3 & 4 \\\\ 0 & 13 & -18 & 23 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix} $$<br>
<strong>5. Ранг — количество ненулевых строк:</strong><br>
$$ r = 3 $$<br>
<strong>6. Дефект:</strong><br>
$$ d = n - r = 4 - 3 = 1 $$<br>
<strong>Ответ:</strong> $r = 3$, $d = 1$.`
            },
            {
                label: '5.9', source: 'Основная волна', analogyOf: 13, cond: 'Исследовать на знакоопределённость: $f(x, y, z) = 2xy + 0xz - 4yz - 2x^2 - 3y^2 - 5z^2$.',
                answer: { sign: 'отрицательно определённая', inputLabel: 'Введите ответ:' },
                solution: `<strong>Решение:</strong><br><br>
<strong>Переписываем в стандартном порядке:</strong><br>
$$ f(x, y, z) = -2x^2 - 3y^2 - 5z^2 + 2xy - 4yz $$
<strong>Матрица:</strong><br>
Коэффициенты при квадратах: $a_{11} = -2$, $a_{22} = -3$, $a_{33} = -5$.<br>
Коэффициент при $xy$: $2a_{12} = 2 \\Rightarrow a_{12} = 1$.<br>
Коэффициент при $xz$: $2a_{13} = 0 \\Rightarrow a_{13} = 0$.<br>
Коэффициент при $yz$: $2a_{23} = -4 \\Rightarrow a_{23} = -2$.<br>
$$ A = \\begin{pmatrix} -2 & 1 & 0 \\\\ 1 & -3 & -2 \\\\ 0 & -2 & -5 \\end{pmatrix} $$<br>
<strong>Угловые миноры:</strong><br>
$$ \\Delta_1 = -2 < 0 $$
$$ \\Delta_2 = \\begin{vmatrix} -2 & 1 \\\\ 1 & -3 \\end{vmatrix} = (-2)(-3) - 1 \\cdot 1 = 6 - 1 = 5 > 0 $$
$$ \\Delta_3 = \\det A = (-2)((-3)(-5) - (-2)(-2)) - 1(1\\cdot(-5) - 0\\cdot(-2)) + 0 $$
$$ = (-2)(15 - 4) - 1(-5) = (-2)(11) + 5 = -22 + 5 = -17 < 0 $$<br>
<strong>Вывод:</strong> $\\Delta_1 < 0$, $\\Delta_2 > 0$, $\\Delta_3 < 0$ — знаки чередуются, начиная с минуса.<br>
<strong>Ответ:</strong> отрицательно определённая.`
            },
        ]
    },
    {
        num: 2, title: 'Дифференциальные уравнения',
        desc: 'типы ДУ первого порядка, понижение порядка, структура решения НЛДУ, системы ОЛДУ, частное решение СНЛДУ.',
        points: 20,
        tasks: [
            {
                label: '6.1', cond: 'Определить тип ДУ и свести к ДУ с разделяющимися переменными: $(x^2 - y^2)dx + 3xy \\cos(y/x) dy = 0$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$M(x,y) = x^2 - y^2$, $N(x,y) = 3xy \\cos(y/x)$<br>
$M(tx,ty) = t^2 x^2 - t^2 y^2 = t^2(x^2 - y^2) = t^2 M(x,y)$<br>
$N(tx,ty) = 3(tx)(ty) \\cos\\left(\\frac{ty}{tx}\\right) = t^2 \\cdot 3xy \\cos(y/x) = t^2 N(x,y)$<br>
<strong>Тип:</strong> однородное ДУ-I (степень однородности $k = 2$).<br><br>
<strong>2. Замена.</strong><br>
$y = zx$<br>
$dy = z\\,dx + x\\,dz$<br><br>
<strong>3. Подставляем.</strong><br>
$(x^2 - z^2 x^2)dx + 3x(zx) \\cos z \\cdot (z\\,dx + x\\,dz) = 0$<br>
$x^2(1 - z^2)dx + 3x^2 z \\cos z \\cdot z\\,dx + 3x^2 z \\cos z \\cdot x\\,dz = 0$<br>
$x^2(1 - z^2)dx + 3x^2 z^2 \\cos z\\,dx + 3x^3 z \\cos z\\,dz = 0$<br>
$x^2(1 - z^2 + 3z^2 \\cos z)dx + 3x^3 z \\cos z\\,dz = 0$<br><br>
<strong>4. Сокращаем на $x$.</strong><br>
$x(1 - z^2 + 3z^2 \\cos z)dx + 3x^2 z \\cos z\\,dz = 0$<br><br>
<strong>Ответ:</strong> уравнение сведено к разделяющимся переменным:<br>
$$ x^2(1 - z^2 + 3z^2 \\cos z)\\,dx + 3x^3 z \\cos z\\,dz = 0 $$`
            },
            {
                label: '6.2', cond: 'Определить тип ДУ и свести к ДУ с разделяющимися переменными: $y\' + 2xy = y^4 \\tg x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$y\' + a(x)y = f(x)y^\\alpha$<br>
$a(x) = 2x$, $f(x) = \\tg x$, $\\alpha = 4$<br>
<strong>Тип:</strong> уравнение Бернулли ($\\alpha = 4$, $\\alpha \\neq 0,1$).<br><br>
<strong>2. Замена Бернулли.</strong><br>
$y = uv$<br>
$y\' = u\'v + uv\'$<br><br>
<strong>3. Подставляем.</strong><br>
$u\'v + uv\' + 2x \\cdot uv = u^4 v^4 \\tg x$<br>
$(u\' + 2xu)v + uv\' = u^4 v^4 \\tg x$<br><br>
<strong>4. Находим $u$.</strong><br>
Положим $u\' + 2xu = 0$:<br>
$\\frac{du}{u} = -2x\\,dx$<br>
$\\ln|u| = -x^2$<br>
$u = e^{-x^2}$<br><br>
<strong>5. Подставляем $u$.</strong><br>
$e^{-x^2} v\' = e^{-4x^2} v^4 \\tg x$<br>
$v\' = e^{-3x^2} v^4 \\tg x$<br><br>
<strong>6. Разделяем переменные.</strong><br>
$\\frac{dv}{v^4} = e^{-3x^2} \\tg x\\,dx$<br><br>
<strong>Ответ:</strong> уравнение сведено к разделяющимся переменным:<br>
$$ \\frac{dv}{v^4} = e^{-3x^2} \\tg x\\,dx $$`
            },
            {
                label: '7.1', cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $\\frac{yy\'\' - (y\')^2}{y^2} = 4x + yy\'$.',
                solution: `<strong>Решение:</strong><br><br>
Левая часть — производная:<br>
$$ \\left(\\frac{y\'}{y}\\right)\' = \\frac{yy\'\' - (y\')^2}{y^2} $$<br>
Переписываем:<br>
$$ \\left(\\frac{y\'}{y}\\right)\' - yy\' = 4x $$<br>
Замечаем, что $yy\' = \\left(\\frac{y^2}{2}\\right)\'$:<br>
$$ \\left(\\frac{y\'}{y}\\right)\' - \\left(\\frac{y^2}{2}\\right)\' = 4x $$<br>
Объединяем под одной производной:<br>
$$ \\left(\\frac{y\'}{y} - \\frac{y^2}{2}\\right)\' = 4x $$<br>
Интегрируем:<br>
$$ \\frac{y\'}{y} - \\frac{y^2}{2} = 2x^2 + C $$<br>
<strong>Ответ:</strong> ДУ сведено к первому порядку:<br>
$$ \\frac{y\'}{y} = 2x^2 + \\frac{y^2}{2} + C $$`
            },
            {
                label: '7.2', cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $yy\' + yy\'\' \\ln x = x(y\')^2$.',
                solution: `<strong>Решение:</strong><br><br>
Замена $y\' = zy$. Тогда:<br>
$$ y\'\' = z\'y + z^2 y $$<br>
Подставляем:<br>
$$ y \\cdot zy + y(z\'y + z^2 y) \\ln x = x(zy)^2 $$<br>
$$ z y^2 + (z\'y^2 + z^2 y^2) \\ln x = x z^2 y^2 $$<br>
Делим на $y^2$:<br>
$$ z + (z\' + z^2) \\ln x = x z^2 $$<br>
$$ z\' \\ln x + z + z^2 \\ln x = x z^2 $$<br>
$$ z\' \\ln x + z + z^2(\\ln x - x) = 0 $$<br>
<strong>Ответ:</strong> ДУ сведено к первому порядку:<br>
$$ z\' \\ln x + z + (\\ln x - x) z^2 = 0 $$`
            },
            {
                label: '8.1', cond: 'Для данного НЛДУ записать общее решение с неопределёнными коэффициентами: $y\'\' - 4y\' + 4y = (4x + 1)\\cos 2x + 5\\sin 2x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Соответствующее ОЛДУ</strong><br>
$$ y\'\' - 4y\' + 4y = 0 $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ \\lambda^2 - 4\\lambda + 4 = 0 $$<br>
$$ \\mathcal{D} = 16 - 16 = 0 $$<br>
$$ \\lambda_{1,2} = \\frac{4 \\pm 0}{2} = 2 $$<br>
<strong>3. ФСР ОЛДУ</strong><br>
$$ \\text{ФСР: } e^{2x},\\; xe^{2x} $$<br>
$$ y_{\\text{о.о.}} = C_1 e^{2x} + C_2 xe^{2x} $$<br>
<strong>4. Правая часть НЛДУ</strong><br>
$$ f(x) = (4x + 1)\\cos 2x + 5\\sin 2x $$<br>
<strong>5. Вид частного решения</strong><br>
Правая часть имеет вид $e^{\\alpha x}(P_n(x)\\cos\\beta x + Q_m(x)\\sin\\beta x)$,<br>
где $\\alpha = 0$, $\\beta = 2$, $P_1(x) = 4x + 1$, $Q_0(x) = 5$.<br>
Сравниваем $\\alpha \\pm \\beta i = \\pm 2i$ с корнями ХУ $\\lambda = 2$:<br>
$$ \\alpha \\pm \\beta i = \\pm 2i \\neq 2 \\implies s = 0 $$<br>
$$ y_{\\text{ч.н.}} = (A + Bx)\\cos 2x + (C + Dx)\\sin 2x $$<br>
<strong>6. Общее решение НЛДУ</strong><br>
$$ y_{\\text{о.н.}} = y_{\\text{о.о.}} + y_{\\text{ч.н.}} $$<br>
<strong>Ответ:</strong><br>
$$ y_{\\text{о.н.}} = C_1 e^{2x} + C_2 xe^{2x} + (A + Bx)\\cos 2x + (C + Dx)\\sin 2x $$`
            },
            {
                label: '8.2', analogyOf: 24, cond: 'Для данного НЛДУ записать общее решение с неопределёнными коэффициентами: $y\'\' + 4y = 3x\\cos 2x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Соответствующее ОЛДУ</strong><br>
$$ y\'\' + 4y = 0 $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ \\lambda^2 + 4 = 0 $$<br>
$$ \\lambda_{1,2} = \\pm 2i $$<br>
<strong>3. ФСР ОЛДУ</strong><br>
$$ \\text{ФСР: } \\cos 2x,\\; \\sin 2x $$<br>
$$ y_{\\text{о.о.}} = C_1 \\cos 2x + C_2 \\sin 2x $$<br>
<strong>4. Правая часть НЛДУ</strong><br>
$$ f(x) = 3x\\cos 2x $$<br>
<strong>5. Вид частного решения</strong><br>
Правая часть имеет вид $e^{\\alpha x}(P_n(x)\\cos\\beta x + Q_m(x)\\sin\\beta x)$,<br>
где $\\alpha = 0$, $\\beta = 2$, $P_1(x) = 3x$, $Q_0(x) = 0$.<br>
Сравниваем $\\alpha \\pm \\beta i = \\pm 2i$ с корнями ХУ $\\lambda = \\pm 2i$:<br>
$$ \\alpha \\pm \\beta i = \\pm 2i \\implies s = 1 $$<br>
$$ y_{\\text{ч.н.}} = x\\big[(A + Bx)\\cos 2x + (C + Dx)\\sin 2x\\big] $$<br>
<strong>6. Общее решение НЛДУ</strong><br>
$$ y_{\\text{о.н.}} = y_{\\text{о.о.}} + y_{\\text{ч.н.}} $$<br>
<strong>Ответ:</strong><br>
$$ y_{\\text{о.н.}} = C_1 \\cos 2x + C_2 \\sin 2x + x\\big[(A + Bx)\\cos 2x + (C + Dx)\\sin 2x\\big] $$`
            },
            {
                label: '9.1', cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ: $\\begin{cases} \\dot{x} = x + y \\\\ \\dot{y} = 3y - 2x \\end{cases}$. Ответ представить в векторной форме.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица системы</strong><br>
$$ A = \\begin{pmatrix} 1 & 1 \\\\ -2 & 3 \\end{pmatrix} $$<br>
<strong>2. Собственные значения</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 1 - \\lambda & 1 \\\\ -2 & 3 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (1 - \\lambda)(3 - \\lambda) + 2 = 0 $$<br>
$$ \\lambda^2 - 4\\lambda + 5 = 0 $$<br>
$$ \\mathcal{D} = 16 - 20 = -4 $$<br>
$$ \\lambda_{1,2} = \\frac{4 \\pm 2i}{2} = 2 \\pm i $$<br>
<strong>3. Собственный вектор для $\\lambda = 2 + i$</strong><br>
$$ \\begin{pmatrix} -1 - i & 1 \\\\ -2 & 1 - i \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ (-1 - i)x_1 + x_2 = 0 \\implies x_2 = (1 + i)x_1 $$<br>
Выберем $x_1 = 1$:<br>
$$ \\bar{v} = \\begin{pmatrix} 1 \\\\ 1 + i \\end{pmatrix} $$<br>
<strong>4. Комплексное решение</strong><br>
$$ \\bar{z}(t) = \\begin{pmatrix} 1 \\\\ 1 + i \\end{pmatrix} e^{(2 + i)t} = \\begin{pmatrix} 1 \\\\ 1 + i \\end{pmatrix} e^{2t}(\\cos t + i \\sin t) $$<br>
$$ \\bar{z}(t) = e^{2t} \\begin{pmatrix} \\cos t + i \\sin t \\\\ (\\cos t - \\sin t) + i(\\cos t + \\sin t) \\end{pmatrix} $$<br>
<strong>5. ФСР СОЛДУ</strong><br>
$$ \\bar{x}_1(t) = e^{2t} \\begin{pmatrix} \\cos t \\\\ \\cos t - \\sin t \\end{pmatrix} $$<br>
$$ \\bar{x}_2(t) = e^{2t} \\begin{pmatrix} \\sin t \\\\ \\cos t + \\sin t \\end{pmatrix} $$<br>
<strong>6. Общее решение</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 e^{2t} \\begin{pmatrix} \\cos t \\\\ \\cos t - \\sin t \\end{pmatrix} + C_2 e^{2t} \\begin{pmatrix} \\sin t \\\\ \\cos t + \\sin t \\end{pmatrix} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} \\cos t \\\\ \\cos t - \\sin t \\end{pmatrix} e^{2t} + C_2 \\begin{pmatrix} \\sin t \\\\ \\cos t + \\sin t \\end{pmatrix} e^{2t} $$`
            },
            {
                label: '9.2', cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ: $\\begin{cases} \\dot{x} = 6x + y \\\\ \\dot{y} = 5x + 2y \\end{cases}$. Ответ представить в векторной форме.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица системы</strong><br>
$$ A = \\begin{pmatrix} 6 & 1 \\\\ 5 & 2 \\end{pmatrix} $$<br>
<strong>2. Собственные значения</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 6 - \\lambda & 1 \\\\ 5 & 2 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (6 - \\lambda)(2 - \\lambda) - 5 = 0 $$<br>
$$ \\lambda^2 - 8\\lambda + 7 = 0 $$<br>
$$ (\\lambda - 1)(\\lambda - 7) = 0 $$<br>
$$ \\lambda_1 = 1,\\; \\lambda_2 = 7 $$<br>
<strong>3. Собственный вектор для $\\lambda_1 = 1$</strong><br>
$$ \\begin{pmatrix} 5 & 1 \\\\ 5 & 1 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ 5x_1 + x_2 = 0 \\implies x_2 = -5x_1 $$<br>
Выберем $x_1 = -1$:<br>
$$ \\bar{v}_1 = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} $$<br>
<strong>4. Собственный вектор для $\\lambda_2 = 7$</strong><br>
$$ \\begin{pmatrix} -1 & 1 \\\\ 5 & -5 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ -x_1 + x_2 = 0 \\implies x_1 = x_2 $$<br>
Выберем $x_1 = 1$:<br>
$$ \\bar{v}_2 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} $$<br>
<strong>5. Общее решение</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} e^{t} + C_2 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{7t} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} e^{t} + C_2 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{7t} $$`
            },
            {
                label: '9.3', cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ. Ответ представить в векторной форме.\n$$\\begin{cases} \\dot{x} = 2x - 5y \\\\ \\dot{y} = x - 2y \\end{cases}$$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица коэффициентов</strong><br>
$$ A = \\begin{pmatrix} 2 & -5 \\\\ 1 & -2 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 2 - \\lambda & -5 \\\\ 1 & -2 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (2 - \\lambda)(-2 - \\lambda) + 5 = 0 $$<br>
$$ \\lambda^2 + 1 = 0 $$<br>
$$ \\lambda_{1,2} = \\pm i $$<br>
<strong>3. Собственный вектор для $\\lambda = i$</strong><br>
$$ \\begin{pmatrix} 2 - i & -5 \\\\ 1 & -2 - i \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ x_1 + (-2 - i)x_2 = 0 \\implies x_1 = (2 + i)x_2 $$<br>
Выберем $x_2 = 1$:<br>
$$ \\bar{v} = \\begin{pmatrix} 2 + i \\\\ 1 \\end{pmatrix} $$<br>
<strong>4. Комплексное решение</strong><br>
$$ \\bar{z}(t) = \\begin{pmatrix} 2 + i \\\\ 1 \\end{pmatrix} e^{it} = \\begin{pmatrix} 2 + i \\\\ 1 \\end{pmatrix} (\\cos t + i \\sin t) $$<br>
$$ \\bar{z}(t) = \\begin{pmatrix} (2 + i)(\\cos t + i \\sin t) \\\\ \\cos t + i \\sin t \\end{pmatrix} = \\begin{pmatrix} 2\\cos t - \\sin t + i(2\\sin t + \\cos t) \\\\ \\cos t + i \\sin t \\end{pmatrix} $$<br>
<strong>5. ФСР СОЛДУ</strong><br>
$$ \\bar{x}_1(t) = \\begin{pmatrix} 2\\cos t - \\sin t \\\\ \\cos t \\end{pmatrix} $$<br>
$$ \\bar{x}_2(t) = \\begin{pmatrix} 2\\sin t + \\cos t \\\\ \\sin t \\end{pmatrix} $$<br>
<strong>6. Общее решение</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 2\\cos t - \\sin t \\\\ \\cos t \\end{pmatrix} + C_2 \\begin{pmatrix} 2\\sin t + \\cos t \\\\ \\sin t \\end{pmatrix} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 2\\cos t - \\sin t \\\\ \\cos t \\end{pmatrix} + C_2 \\begin{pmatrix} 2\\sin t + \\cos t \\\\ \\sin t \\end{pmatrix} $$`,
                analogyOf: 26
            },
            {
                label: '9.4', cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ. Ответ представить в векторной форме.\n$$\\begin{cases} \\dot{x} = x + 3y \\\\ \\dot{y} = 2x + 2y \\end{cases}$$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица коэффициентов</strong><br>
$$ A = \\begin{pmatrix} 1 & 3 \\\\ 2 & 2 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 1 - \\lambda & 3 \\\\ 2 & 2 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (1 - \\lambda)(2 - \\lambda) - 6 = 0 $$<br>
$$ \\lambda^2 - 3\\lambda - 4 = 0 $$<br>
$$ (\\lambda - 4)(\\lambda + 1) = 0 $$<br>
$$ \\lambda_1 = 4,\\; \\lambda_2 = -1 $$<br>
<strong>3. Собственный вектор для $\\lambda_1 = 4$</strong><br>
$$ \\begin{pmatrix} -3 & 3 \\\\ 2 & -2 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ -3x_1 + 3x_2 = 0 \\implies x_1 = x_2 $$<br>
Выберем $x_1 = 1$:<br>
$$ \\bar{v}_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} $$<br>
<strong>4. Собственный вектор для $\\lambda_2 = -1$</strong><br>
$$ \\begin{pmatrix} 2 & 3 \\\\ 2 & 3 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ 2x_1 + 3x_2 = 0 \\implies x_2 = -\\frac{2}{3}x_1 $$<br>
Выберем $x_1 = 3$:<br>
$$ \\bar{v}_2 = \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} $$<br>
<strong>5. Общее решение</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{4t} + C_2 \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} e^{-t} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{4t} + C_2 \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} e^{-t} $$`,
                analogyOf: 27
            },
            {
                label: '10.1', cond: 'Решить систему сведением к одному ДУ: $\\begin{cases} \\dot{x} = 2x - y \\\\ \\dot{y} = 4x + 6y \\end{cases}$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Выражаем $y$ из первого уравнения</strong><br>
$$ y = 2x - \\dot{x} $$<br>
<strong>2. Дифференцируем</strong><br>
$$ \\dot{y} = 2\\dot{x} - \\ddot{x} $$<br>
<strong>3. Подставляем во второе уравнение</strong><br>
$$ 4x + 6(2x - \\dot{x}) = 2\\dot{x} - \\ddot{x} $$<br>
$$ 4x + 12x - 6\\dot{x} = 2\\dot{x} - \\ddot{x} $$<br>
$$ \\ddot{x} - 8\\dot{x} + 16x = 0 $$<br>
<strong>4. Характеристическое уравнение</strong><br>
$$ \\lambda^2 - 8\\lambda + 16 = 0 $$<br>
$$ (\\lambda - 4)^2 = 0 \\implies \\lambda_{1,2} = 4 $$<br>
<strong>5. Общее решение для $x$</strong><br>
$$ x_{\\text{о.о.}} = C_1 e^{4t} + C_2 t e^{4t} $$<br>
<strong>6. Находим $y_{\\text{о.о.}}$</strong><br>
$$ y_{\\text{о.о.}} = 2x_{\\text{о.о.}} - \\dot{x}_{\\text{о.о.}} $$<br>
$$ \\dot{x}_{\\text{о.о.}} = 4C_1 e^{4t} + C_2 e^{4t} + 4C_2 t e^{4t} $$<br>
$$ y_{\\text{о.о.}} = 2(C_1 e^{4t} + C_2 t e^{4t}) - (4C_1 e^{4t} + C_2 e^{4t} + 4C_2 t e^{4t}) $$<br>
$$ y_{\\text{о.о.}} = -2C_1 e^{4t} - C_2 e^{4t} - 2C_2 t e^{4t} $$<br>
<strong>7. Векторная форма</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix} e^{4t} + C_2 \\begin{pmatrix} t \\\\ -1 - 2t \\end{pmatrix} e^{4t} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix} e^{4t} + C_2 \\begin{pmatrix} t \\\\ -1 - 2t \\end{pmatrix} e^{4t} $$`
            },
            {
                label: '11.1', cond: 'Указать вид частного решения СНЛДУ: $\\begin{cases} \\dot{x} = 3x - y + 5e^t \\\\ \\dot{y} = 4x - y \\end{cases}$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Соответствующая СОЛДУ</strong><br>
$$ \\begin{cases} \\dot{x} = 3x - y \\\\ \\dot{y} = 4x - y \\end{cases} $$<br>
<strong>2. Матрица системы</strong><br>
$$ A = \\begin{pmatrix} 3 & -1 \\\\ 4 & -1 \\end{pmatrix} $$<br>
<strong>3. Собственные значения</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 3 - \\lambda & -1 \\\\ 4 & -1 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (3 - \\lambda)(-1 - \\lambda) + 4 = 0 $$<br>
$$ \\lambda^2 - 2\\lambda + 1 = 0 $$<br>
$$ (\\lambda - 1)^2 = 0 \\implies \\lambda_{1,2} = 1 $$<br>
<strong>4. Правая часть СНЛДУ</strong><br>
$$ \\vec{F}(t) = \\begin{pmatrix} 5e^t \\\\ 0 \\end{pmatrix} $$<br>
<strong>5. Сравнение с корнями ХУ</strong><br>
$\\alpha = 1$ совпадает с корнем $\\lambda = 1$ кратности $s = 2$.<br>
<strong>6. Вид частного решения</strong><br>
$$ \\bar{x}_{\\text{ч.н.}} = t^s \\cdot \\vec{Q}(t) e^{\\alpha t} = t^2 \\begin{pmatrix} A + Bt + Ct^2 \\\\ D + Et + Ft^2 \\end{pmatrix} e^t $$<br>
<strong>Ответ:</strong> в билете указано:<br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{ч.н.}} = \\begin{pmatrix} A + Bt + Ct^2 \\\\ D + Et + Ft^2 \\end{pmatrix} e^t $$`
            },
            {
                label: '7.3', analogyOf: 22, cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $2xy\' + x^2 y\'\' = 0$.',
                solution: `<strong>Решение:</strong><br><br>
Замечаем полную производную:<br>
$$ (x^2 y\')\' = 2x y\' + x^2 y\'\' $$<br>
$$ (x^2 y\')\' = 0 $$<br>
$$ \\int (x^2 y\')\' dx = \\int 0\\,dx $$<br>
$$ x^2 y\' = C $$<br>
<strong>Ответ:</strong> $x^2 y\' = C$ — ДУ первого порядка.`
            },
            {
                label: '7.4', analogyOf: 23, cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $y^2 y\'\' + 2(y\')^2 y - 3y^2 y\' = 0$.',
                solution: `<strong>Решение:</strong><br><br>
ДУ однородно относительно $y, y\', y\'\'$ — замена $y\' = z \\cdot y$:<br>
$$ y\'\' = (z\' + z^2) y $$<br>
$$ y^2 (z\' + z^2) y + 2 (z y)^2 y - 3y^2 \\cdot z y = 0 $$<br>
$$ y^3(z\' + z^2) + 2y^3 z^2 - 3y^3 z = 0 $$<br>
Делим на $y^3$:<br>
$$ z\' + z^2 + 2z^2 - 3z = 0 $$<br>
$$ z\' + 3z^2 - 3z = 0 $$<br>
<strong>Ответ:</strong> $z\' + 3z^2 - 3z = 0$ — ДУ первого порядка.`
            },
            {
                label: '6.3', analogyOf: 20, cond: 'Определить тип ДУ и свести к ДУ с разделяющимися переменными: $(y^2 - 2x^2)dx + 2xy \\ln(y/x)dy = 0$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$M(x,y) = y^2 - 2x^2$, $N(x,y) = 2xy \\ln(y/x)$<br>
$M(tx,ty) = t^2 y^2 - 2t^2 x^2 = t^2(y^2 - 2x^2) = t^2 M(x,y)$<br>
$N(tx,ty) = 2(tx)(ty) \\ln\\left(\\frac{ty}{tx}\\right) = t^2 \\cdot 2xy \\ln(y/x) = t^2 N(x,y)$<br>
<strong>Тип:</strong> однородное ДУ-I (степень однородности $k = 2$).<br><br>
<strong>2. Замена.</strong><br>
$y = zx$<br>
$dy = z\\,dx + x\\,dz$<br><br>
<strong>3. Подставляем.</strong><br>
$(z^2 x^2 - 2x^2)dx + 2x(zx) \\ln z \\cdot (z\\,dx + x\\,dz) = 0$<br>
$x^2(z^2 - 2)dx + 2x^2 z \\ln z \\cdot z\\,dx + 2x^2 z \\ln z \\cdot x\\,dz = 0$<br>
$x^2(z^2 - 2)dx + 2x^2 z^2 \\ln z\\,dx + 2x^3 z \\ln z\\,dz = 0$<br>
$x^2(z^2 - 2 + 2z^2 \\ln z)dx + 2x^3 z \\ln z\\,dz = 0$<br><br>
<strong>Ответ:</strong> уравнение сведено к разделяющимся переменным:<br>
$$ x^2(z^2 - 2 + 2z^2 \\ln z)\\,dx + 2x^3 z \\ln z\\,dz = 0 $$`
            },
            {
                label: '6.4', analogyOf: 20, cond: 'Определить тип ДУ и свести к ДУ с разделяющимися переменными: $(x^2 + y^2)dx - xy \\sin(y/x)dy = 0$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$M(x,y) = x^2 + y^2$, $N(x,y) = -xy \\sin(y/x)$<br>
$M(tx,ty) = t^2 x^2 + t^2 y^2 = t^2(x^2 + y^2) = t^2 M(x,y)$<br>
$N(tx,ty) = -(tx)(ty) \\sin\\left(\\frac{ty}{tx}\\right) = t^2 \\cdot (-xy) \\sin(y/x) = t^2 N(x,y)$<br>
<strong>Тип:</strong> однородное ДУ-I (степень однородности $k = 2$).<br><br>
<strong>2. Замена.</strong><br>
$y = zx$<br>
$dy = z\\,dx + x\\,dz$<br><br>
<strong>3. Подставляем.</strong><br>
$(x^2 + z^2 x^2)dx - x(zx) \\sin z \\cdot (z\\,dx + x\\,dz) = 0$<br>
$x^2(1 + z^2)dx - x^2 z \\sin z \\cdot z\\,dx - x^2 z \\sin z \\cdot x\\,dz = 0$<br>
$x^2(1 + z^2)dx - x^2 z^2 \\sin z\\,dx - x^3 z \\sin z\\,dz = 0$<br>
$x^2(1 + z^2 - z^2 \\sin z)dx - x^3 z \\sin z\\,dz = 0$<br><br>
<strong>Ответ:</strong> уравнение сведено к разделяющимся переменным:<br>
$$ x^2(1 + z^2 - z^2 \\sin z)\\,dx - x^3 z \\sin z\\,dz = 0 $$`
            },
            {
                label: '6.5', analogyOf: 21, cond: 'Определить тип ДУ и привести к ДУ с разделяющимися переменными: $y\' + 3x^2 y = y^3 \\cos x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$y\' + a(x)y = f(x)y^\\alpha$<br>
$a(x) = 3x^2$, $f(x) = \\cos x$, $\\alpha = 3$<br>
<strong>Тип:</strong> уравнение Бернулли ($\\alpha = 3$, $\\alpha \\neq 0,1$).<br><br>
<strong>2. Замена Бернулли.</strong><br>
$y = uv$<br>
$y\' = u\'v + uv\'$<br><br>
<strong>3. Подставляем.</strong><br>
$u\'v + uv\' + 3x^2 \\cdot uv = u^3 v^3 \\cos x$<br>
$(u\' + 3x^2 u)v + uv\' = u^3 v^3 \\cos x$<br><br>
<strong>4. Находим $u$.</strong><br>
Положим $u\' + 3x^2 u = 0$:<br>
$\\frac{du}{u} = -3x^2\\,dx$<br>
$\\ln|u| = -x^3$<br>
$u = e^{-x^3}$<br><br>
                <strong>5. Подставляем $u$.</strong><br>
$e^{-x^3} v\' = e^{-3x^3} v^3 \\cos x$<br>
$v\' = e^{-2x^3} v^3 \\cos x$<br><br>
<strong>Ответ:</strong> уравнение сведено к разделяющимся переменным:<br>
$$ e^{-2x^3} \\cos x\\,dx - v^{-3}\\,dv = 0 $$`
            },
            {
                label: '6.6', analogyOf: 21, cond: 'Определить тип ДУ и привести к ДУ с разделяющимися переменными: $y\' - \\frac{y}{x} = y^2 \\ln x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$y\' + a(x)y = f(x)y^\\alpha$<br>
$a(x) = -\\frac{1}{x}$, $f(x) = \\ln x$, $\\alpha = 2$<br>
<strong>Тип:</strong> уравнение Бернулли ($\\alpha = 2$, $\\alpha \\neq 0,1$).<br><br>
<strong>2. Замена Бернулли.</strong><br>
$y = uv$<br>
$y\' = u\'v + uv\'$<br><br>
<strong>3. Подставляем.</strong><br>
$u\'v + uv\' - \\frac{uv}{x} = u^2 v^2 \\ln x$<br>
$(u\' - \\frac{u}{x})v + uv\' = u^2 v^2 \\ln x$<br><br>
<strong>4. Находим $u$.</strong><br>
Положим $u\' - \\frac{u}{x} = 0$:<br>
$\\frac{du}{u} = \\frac{dx}{x}$<br>
$\\ln|u| = \\ln|x|$<br>
$u = x$<br><br>
                <strong>5. Подставляем $u$.</strong><br>
$xv\' = x^2 v^2 \\ln x$<br>
$v\' = xv^2 \\ln x$<br><br>
<strong>Ответ:</strong> уравнение сведено к разделяющимся переменным:<br>
$$ x \\ln x\\,dx - v^{-2}\\,dv = 0 $$`
            },
            {
                label: '9.5', analogyOf: 26,
                cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ. Ответ представить в векторной форме.\n$$\\begin{cases} \\dot{x} = 8y - x \\\\ \\dot{y} = -x - y \\end{cases}$$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица коэффициентов</strong><br>
$$ A = \\begin{pmatrix} -1 & 8 \\\\ -1 & -1 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} -1 - \\lambda & 8 \\\\ -1 & -1 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (-1 - \\lambda)^2 + 8 = 0 $$<br>
$$ \\lambda^2 + 2\\lambda + 9 = 0 $$<br>
$$ \\mathcal{D} = 4 - 36 = -32 $$<br>
$$ \\lambda_{1,2} = \\frac{-2 \\pm 4\\sqrt{2}i}{2} = -1 \\pm 2\\sqrt{2}i $$<br>
<strong>3. Собственный вектор для $\\lambda = -1 + 2\\sqrt{2}i$</strong><br>
$$ \\begin{pmatrix} -2\\sqrt{2}i & 8 \\\\ -1 & -2\\sqrt{2}i \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ -x_1 - 2\\sqrt{2}i \\cdot x_2 = 0 \\implies x_1 = -2\\sqrt{2}i \\cdot x_2 $$<br>
Выберем $x_2 = 1$:<br>
$$ \\bar{v} = \\begin{pmatrix} -2\\sqrt{2}i \\\\ 1 \\end{pmatrix} $$<br>
<strong>4. Комплексное решение</strong><br>
$$ \\bar{z}(t) = \\begin{pmatrix} -2\\sqrt{2}i \\\\ 1 \\end{pmatrix} e^{(-1 + 2\\sqrt{2}i)t} = e^{-t} \\begin{pmatrix} -2\\sqrt{2}i \\\\ 1 \\end{pmatrix} (\\cos(2\\sqrt{2}t) + i\\sin(2\\sqrt{2}t)) $$<br>
$$ \\bar{z}(t) = e^{-t} \\begin{pmatrix} 2\\sqrt{2}\\sin(2\\sqrt{2}t) - 2\\sqrt{2}i\\cos(2\\sqrt{2}t) \\\\ \\cos(2\\sqrt{2}t) + i\\sin(2\\sqrt{2}t) \\end{pmatrix} $$<br>
<strong>5. ФСР СОЛДУ</strong><br>
$$ \\bar{x}_1(t) = e^{-t} \\begin{pmatrix} \\sqrt{8}\\cos(\\sqrt{8}t) \\\\ -\\sin(\\sqrt{8}t) \\end{pmatrix} $$<br>
$$ \\bar{x}_2(t) = e^{-t} \\begin{pmatrix} \\sqrt{8}\\sin(\\sqrt{8}t) \\\\ \\cos(\\sqrt{8}t) \\end{pmatrix} $$<br>
<strong>6. Общее решение</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 e^{-t} \\begin{pmatrix} \\sqrt{8}\\cos(\\sqrt{8}t) \\\\ -\\sin(\\sqrt{8}t) \\end{pmatrix} + C_2 e^{-t} \\begin{pmatrix} \\sqrt{8}\\sin(\\sqrt{8}t) \\\\ \\cos(\\sqrt{8}t) \\end{pmatrix} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 e^{-t} \\begin{pmatrix} \\sqrt{8}\\cos(\\sqrt{8}t) \\\\ -\\sin(\\sqrt{8}t) \\end{pmatrix} + C_2 e^{-t} \\begin{pmatrix} \\sqrt{8}\\sin(\\sqrt{8}t) \\\\ \\cos(\\sqrt{8}t) \\end{pmatrix} $$`
            },
            {
                label: '9.6', analogyOf: 27,
                cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ. Ответ представить в векторной форме.\n$$\\begin{cases} \\dot{x} = x - 8y \\\\ \\dot{y} = -x - y \\end{cases}$$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица коэффициентов</strong><br>
$$ A = \\begin{pmatrix} 1 & -8 \\\\ -1 & -1 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 1 - \\lambda & -8 \\\\ -1 & -1 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (1 - \\lambda)(-1 - \\lambda) - 8 = 0 $$<br>
$$ \\lambda^2 - 9 = 0 $$<br>
$$ \\lambda_1 = 3,\\; \\lambda_2 = -3 $$<br>
<strong>3. Собственный вектор для $\\lambda_1 = 3$</strong><br>
$$ \\begin{pmatrix} -2 & -8 \\\\ -1 & -4 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ -2x_1 - 8x_2 = 0 \\implies x_1 = -4x_2 $$<br>
Выберем $x_2 = 1$:<br>
$$ \\bar{v}_1 = \\begin{pmatrix} -4 \\\\ 1 \\end{pmatrix} $$<br>
<strong>4. Собственный вектор для $\\lambda_2 = -3$</strong><br>
$$ \\begin{pmatrix} 4 & -8 \\\\ -1 & 2 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} $$<br>
$$ 4x_1 - 8x_2 = 0 \\implies x_1 = 2x_2 $$<br>
Выберем $x_2 = 1$:<br>
$$ \\bar{v}_2 = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} $$<br>
<strong>5. Общее решение</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} -4 \\\\ 1 \\end{pmatrix} e^{3t} + C_2 \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} e^{-3t} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} -4 \\\\ 1 \\end{pmatrix} e^{3t} + C_2 \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} e^{-3t} $$`
            },
            {
                label: '10.2',
                cond: 'Решить систему сведением к одному ДУ: $\\begin{cases} \\dot{x} = 5x - y \\\\ \\dot{y} = x + 3y \\end{cases}$',
                analogyOf: 30,
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Выражаем $y$ из первого уравнения</strong><br>
$$ y = 5x - \\dot{x} $$<br>
<strong>2. Дифференцируем</strong><br>
$$ \\dot{y} = 5\\dot{x} - \\ddot{x} $$<br>
<strong>3. Подставляем во второе уравнение</strong><br>
$$ x + 3(5x - \\dot{x}) = 5\\dot{x} - \\ddot{x} $$<br>
$$ x + 15x - 3\\dot{x} = 5\\dot{x} - \\ddot{x} $$<br>
$$ \\ddot{x} - 8\\dot{x} + 16x = 0 $$<br>
<strong>4. Характеристическое уравнение</strong><br>
$$ r^2 - 8r + 16 = 0 $$<br>
$$ (r - 4)^2 = 0 $$<br>
$$ r_1 = r_2 = 4 $$<br>
<strong>5. Общее решение для $x(t)$</strong><br>
$$ x(t) = (C_1 + C_2 t)e^{4t} $$<br>
<strong>6. Находим $y(t)$</strong><br>
$$ y = 5x - \\dot{x} $$<br>
$$ \\dot{x} = C_2 e^{4t} + 4(C_1 + C_2 t)e^{4t} = (4C_1 + C_2 + 4C_2 t)e^{4t} $$<br>
$$ y = 5(C_1 + C_2 t)e^{4t} - (4C_1 + C_2 + 4C_2 t)e^{4t} $$<br>
$$ y = (C_1 - C_2 + C_2 t)e^{4t} $$<br>
<strong>7. Общее решение системы</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{4t} + C_2 \\begin{pmatrix} t \\\\ -1 + t \\end{pmatrix} e^{4t} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{4t} + C_2 \\begin{pmatrix} t \\\\ -1 + t \\end{pmatrix} e^{4t} $$`
            },
            {
                label: '10.3',
                cond: 'Решить систему сведением к одному ДУ: $\\begin{cases} \\dot{x} = -2x - 5y \\\\ \\dot{y} = 2x + 2y \\end{cases}$',
                analogyOf: 30,
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Выражаем $y$ из первого уравнения</strong><br>
$$ y = \\frac{-2x - \\dot{x}}{5} $$<br>
<strong>2. Дифференцируем</strong><br>
$$ \\dot{y} = \\frac{-2\\dot{x} - \\ddot{x}}{5} $$<br>
<strong>3. Подставляем во второе уравнение</strong><br>
$$ 2x + 2 \\cdot \\frac{-2x - \\dot{x}}{5} = \\frac{-2\\dot{x} - \\ddot{x}}{5} $$<br>
$$ 10x + 2(-2x - \\dot{x}) = -2\\dot{x} - \\ddot{x} $$<br>
$$ 10x - 4x - 2\\dot{x} = -2\\dot{x} - \\ddot{x} $$<br>
$$ \\ddot{x} + 6x = 0 $$<br>
<strong>4. Характеристическое уравнение</strong><br>
$$ r^2 + 6 = 0 $$<br>
$$ r_{1,2} = \\pm \\sqrt{6}i $$<br>
<strong>5. Общее решение для $x(t)$</strong><br>
$$ x(t) = C_1 \\cos(\\sqrt{6}t) + C_2 \\sin(\\sqrt{6}t) $$<br>
<strong>6. Находим $y(t)$</strong><br>
$$ \\dot{x} = -\\sqrt{6}C_1 \\sin(\\sqrt{6}t) + \\sqrt{6}C_2 \\cos(\\sqrt{6}t) $$<br>
$$ y = \\frac{-2x - \\dot{x}}{5} = \\frac{-2(C_1 \\cos(\\sqrt{6}t) + C_2 \\sin(\\sqrt{6}t)) - (-\\sqrt{6}C_1 \\sin(\\sqrt{6}t) + \\sqrt{6}C_2 \\cos(\\sqrt{6}t))}{5} $$<br>
$$ y = \\frac{(-2C_1 - \\sqrt{6}C_2)\\cos(\\sqrt{6}t) + (-2C_2 + \\sqrt{6}C_1)\\sin(\\sqrt{6}t)}{5} $$<br>
$$ y = \\left(-\\frac{2}{5}C_1 - \\frac{\\sqrt{6}}{5}C_2\\right)\\cos(\\sqrt{6}t) + \\left(\\frac{\\sqrt{6}}{5}C_1 - \\frac{2}{5}C_2\\right)\\sin(\\sqrt{6}t) $$<br>
<strong>7. Общее решение системы</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} \\cos(\\sqrt{6}t) \\\\ -\\frac{2}{5}\\cos(\\sqrt{6}t) + \\frac{\\sqrt{6}}{5}\\sin(\\sqrt{6}t) \\end{pmatrix} + C_2 \\begin{pmatrix} \\sin(\\sqrt{6}t) \\\\ -\\frac{\\sqrt{6}}{5}\\cos(\\sqrt{6}t) - \\frac{2}{5}\\sin(\\sqrt{6}t) \\end{pmatrix} $$<br>
<strong>Ответ:</strong><br>
$$ \\begin{pmatrix} x \\\\ y \\end{pmatrix}_{\\text{о.о.}} = C_1 \\begin{pmatrix} \\cos(\\sqrt{6}t) \\\\ -\\frac{2}{5}\\cos(\\sqrt{6}t) + \\frac{\\sqrt{6}}{5}\\sin(\\sqrt{6}t) \\end{pmatrix} + C_2 \\begin{pmatrix} \\sin(\\sqrt{6}t) \\\\ -\\frac{\\sqrt{6}}{5}\\cos(\\sqrt{6}t) - \\frac{2}{5}\\sin(\\sqrt{6}t) \\end{pmatrix} $$`
            },
            {
                label: '11.2',
                cond: 'Указать вид частного решения СНЛДУ: $\\begin{cases} \\dot{x} = x + y + 4e^{2t}\\cos t \\\\ \\dot{y} = 3y - 2x - 5e^{2t}\\sin t \\end{cases}$.',
                analogyOf: 31,
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Однородная система</strong><br>
$$ A = \\begin{pmatrix} 1 & 1 \\\\ -2 & 3 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 1 - \\lambda & 1 \\\\ -2 & 3 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (1 - \\lambda)(3 - \\lambda) + 2 = 0 $$<br>
$$ \\lambda^2 - 4\\lambda + 5 = 0 $$<br>
$$ \\lambda_{1,2} = 2 \\pm i $$<br>
<strong>3. Правая часть</strong><br>
$$ \\bar{f}(t) = e^{2t} \\begin{pmatrix} 4\\cos t \\\\ -5\\sin t \\end{pmatrix} $$<br>
Частота $\\alpha + i\\beta = 2 + i$ является корнем характеристического уравнения с кратностью 1.<br>
<strong>4. Вид частного решения</strong><br>
$$ \\bar{x}_p(t) = t e^{2t} \\begin{pmatrix} (A + Bt)\\cos t + (C + Dt)\\sin t \\\\ (F + Gt)\\cos t + (H + Jt)\\sin t \\end{pmatrix} $$`
            },
            {
                label: '11.3',
                cond: 'Указать вид частного решения СНЛДУ: $\\begin{cases} \\dot{x} = 2x - 3y \\\\ \\dot{y} = x - 2y + 2\\sin t \\end{cases}$.',
                analogyOf: 31,
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Однородная система</strong><br>
$$ A = \\begin{pmatrix} 2 & -3 \\\\ 1 & -2 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} 2 - \\lambda & -3 \\\\ 1 & -2 - \\lambda \\end{vmatrix} = 0 $$<br>
$$ (2 - \\lambda)(-2 - \\lambda) + 3 = 0 $$<br>
$$ \\lambda^2 - 4 + 3 = 0 $$<br>
$$ \\lambda^2 - 1 = 0 $$<br>
$$ \\lambda_{1,2} = \\pm 1 $$<br>
<strong>3. Правая часть</strong><br>
$$ \\bar{f}(t) = \\begin{pmatrix} 0 \\\\ 2\\sin t \\end{pmatrix} $$<br>
Частота $\\alpha + i\\beta = 0 + i = i$ не является корнем характеристического уравнения.<br>
<strong>4. Вид частного решения</strong><br>
$$ \\bar{x}_p(t) = \\begin{pmatrix} A\\cos t + B\\sin t \\\\ C\\cos t + D\\sin t \\end{pmatrix} $$`
            },
            {
                label: '6.7', source: 'Основная волна', analogyOf: 21, cond: 'Определить тип ДУ и привести к ДУ с разделяющимися переменными: $y\' - 2x^2 y = y^3 \\sin x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Определяем тип.</strong><br>
$y\' + a(x)y = f(x)y^\\alpha$<br>
$a(x) = -2x^2$, $f(x) = \\sin x$, $\\alpha = 3$<br>
<strong>Тип:</strong> уравнение Бернулли ($\\alpha = 3$, $\\alpha \\neq 0,1$).<br><br>
<strong>2. Замена Бернулли.</strong><br>
$y = uv$<br>
$y\' = u\'v + uv\'$<br><br>
<strong>3. Подставляем.</strong><br>
$u\'v + uv\' - 2x^2 \\cdot uv = u^3 v^3 \\sin x$<br>
$(u\' - 2x^2 u)v + uv\' = u^3 v^3 \\sin x$<br><br>
<strong>4. Находим $u$.</strong><br>
Положим $u\' - 2x^2 u = 0$:<br>
$\\frac{du}{u} = 2x^2\\,dx$<br>
$\\ln|u| = \\frac{2x^3}{3}$<br>
$u = e^{2x^3/3}$<br><br>
<strong>5. Подставляем $u$.</strong><br>
$e^{2x^3/3} v\' = e^{2x^3} v^3 \\sin x$<br>
$v\' = e^{4x^3/3} v^3 \\sin x$<br><br>
<strong>6. Разделяем переменные.</strong><br>
$\\frac{dv}{v^3} = e^{4x^3/3} \\sin x\\,dx$<br>
<strong>Ответ:</strong> $v^{-3}dv - e^{4x^3/3} \\sin x\\,dx = 0$`
            },
            {
                label: '7.5', source: 'Основная волна', analogyOf: 23, cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $(yy\')^3 + y^5 y\'\' \\ln x = x(y\')^6$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Замена $y\' = z \\cdot y$.</strong><br>
Тогда $y\'\' = z\'y + z^2 y$.<br><br>
<strong>2. Подставляем:</strong><br>
$$ (y \\cdot zy)^3 + y^5 (z\'y + z^2 y) \\ln x = x(zy)^6 $$
$$ y^6 z^3 + y^6 (z\' + z^2) \\ln x = x y^6 z^6 $$<br>
<strong>3. Делим на $y^6$ (считаем $y \\neq 0$):</strong><br>
$$ z^3 + (z\' + z^2) \\ln x = x z^6 $$<br>
<strong>Ответ:</strong> $z^3 + (z\' + z^2) \\ln x - x z^6 = 0$`
            },
            {
                label: '7.6', source: 'Основная волна', analogyOf: 23, cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $y^3 y\' + y^2 y\' y\'\' \\ln x = x^2 y (y\')^3$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Замена $y\' = z \\cdot y$.</strong><br>
Тогда $y\'\' = z\'y + z^2 y$.<br><br>
<strong>2. Подставляем:</strong><br>
$$ y^3 \\cdot zy + y^2 \\cdot zy \\cdot (z\'y + z^2 y) \\ln x = x^2 y \\cdot (zy)^3 $$
$$ y^4 z + y^4 z (z\' + z^2) \\ln x = x^2 y^4 z^3 $$<br>
<strong>3. Делим на $y^4$ (считаем $y \\neq 0$):</strong><br>
$$ z + z(z\' + z^2) \\ln x = x^2 z^3 $$<br>
<strong>4. Если $z \\neq 0$, делим на $z$:</strong><br>
$$ 1 + (z\' + z^2) \\ln x = x^2 z^2 $$<br>
<strong>Ответ:</strong> $1 + (z\' + z^2) \\ln x - x^2 z^2 = 0$`
            },
            {
                label: '7.7', source: 'Основная волна', cond: 'Определить тип ДУ, допускающих понижение порядка, и привести к ДУ первого порядка: $yy\'\' + (y\')^2 = 9x^2 + 6y^2 y\'$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Замечаем, что левая часть — производная:</strong><br>
$$ (yy\')\' = y\'y\' + yy\'\' = (y\')^2 + yy\'\' $$<br>
<strong>2. Правая часть:</strong><br>
$$ (2y^3)\' = 6y^2 y\' $$<br>
<strong>3. Переписываем уравнение:</strong><br>
$$ (yy\')\' = 9x^2 + (2y^3)\' $$<br>
<strong>4. Интегрируем:</strong><br>
$$ yy\' = 3x^3 + 2y^3 + C $$<br>
<strong>Ответ:</strong> $yy\' = 3x^3 + 2y^3 + C$ — ДУ первого порядка.`
            },
            {
                label: '8.3', source: 'Основная волна', analogyOf: 25, cond: 'Для данного НЛДУ записать общее решение с неопределёнными коэффициентами: $y\'\' - 4y\' + 13y = 4\\cos 4x + 7x\\sin 4x$.',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Соответствующее ОЛДУ</strong><br>
$$ y\'\' - 4y\' + 13y = 0 $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ \\lambda^2 - 4\\lambda + 13 = 0 $$
$$ \\mathcal{D} = 16 - 52 = -36 $$
$$ \\lambda_{1,2} = \\frac{4 \\pm 6i}{2} = 2 \\pm 3i $$<br>
<strong>3. ФСР ОЛДУ</strong><br>
$$ \\text{ФСР: } e^{2x}\\cos 3x,\\; e^{2x}\\sin 3x $$
$$ y_{\\text{о.о.}} = e^{2x}(C_1\\cos 3x + C_2\\sin 3x) $$<br>
<strong>4. Правая часть НЛДУ</strong><br>
$$ f(x) = 4\\cos 4x + 7x\\sin 4x $$<br>
<strong>5. Вид частного решения</strong><br>
Правая часть имеет вид $e^{\\alpha x}(P_n(x)\\cos\\beta x + Q_m(x)\\sin\\beta x)$,<br>
где $\\alpha = 0$, $\\beta = 4$, $P_0(x) = 4$, $Q_1(x) = 7x$.<br>
Сравниваем $\\alpha \\pm \\beta i = \\pm 4i$ с корнями ХУ $\\lambda = 2 \\pm 3i$:<br>
$$ \\pm 4i \\neq 2 \\pm 3i \\implies s = 0 $$<br>
$$ y_{\\text{ч.н.}} = (A + Bx)\\cos 4x + (C + Dx)\\sin 4x $$<br>
<strong>6. Общее решение НЛДУ</strong><br>
$$ y_{\\text{о.н.}} = e^{2x}(C_1\\cos 3x + C_2\\sin 3x) + (A + Bx)\\cos 4x + (C + Dx)\\sin 4x $$`
            },
            {
                label: '9.7', source: 'Основная волна', analogyOf: 27, cond: 'Решить СОЛДУ, воспользовавшись алгоритмом поиска СЗ и СВ. Ответ представить в векторной форме.\n$$\\begin{cases} \\dot{x} = 2y - 4x \\\\ \\dot{y} = 2x - 4y \\end{cases}$$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Матрица системы</strong><br>
$$ A = \\begin{pmatrix} -4 & 2 \\\\ 2 & -4 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} -4 - \\lambda & 2 \\\\ 2 & -4 - \\lambda \\end{vmatrix} = 0 $$
$$ (-4 - \\lambda)^2 - 4 = 0 $$
$$ \\lambda^2 + 8\\lambda + 12 = 0 $$
$$ \\lambda_1 = -2,\\; \\lambda_2 = -6 $$<br>
<strong>3. Собственный вектор для $\\lambda_1 = -2$</strong><br>
$$ (A + 2E)v_1 = 0,\\; \\begin{pmatrix} -2 & 2 \\\\ 2 & -2 \\end{pmatrix} \\rightarrow v_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} $$<br>
<strong>4. Собственный вектор для $\\lambda_2 = -6$</strong><br>
$$ (A + 6E)v_2 = 0,\\; \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix} \\rightarrow v_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} $$<br>
<strong>5. Общее решение</strong><br>
$$ \\bar{x}(t) = C_1 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} e^{-2t} + C_2 \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} e^{-6t} $$`
            },
            {
                label: '10.4', source: 'Основная волна', analogyOf: 31, cond: 'Решить систему сведением к одному ДУ: $\\begin{cases} \\dot{x} = 4x - 2y \\\\ \\dot{y} = 8x + 12y \\end{cases}$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Выражаем $y$ из первого уравнения:</strong><br>
$$ \\dot{x} = 4x - 2y \\Rightarrow y = \\frac{4x - \\dot{x}}{2} $$<br>
<strong>2. Дифференцируем:</strong><br>
$$ \\dot{y} = \\frac{4\\dot{x} - \\ddot{x}}{2} $$<br>
<strong>3. Подставляем во второе уравнение:</strong><br>
$$ \\frac{4\\dot{x} - \\ddot{x}}{2} = 8x + 12 \\cdot \\frac{4x - \\dot{x}}{2} $$
$$ 4\\dot{x} - \\ddot{x} = 16x + 48x - 12\\dot{x} $$
$$ \\ddot{x} - 16\\dot{x} + 64x = 0 $$<br>
<strong>4. Характеристическое уравнение:</strong><br>
$$ \\lambda^2 - 16\\lambda + 64 = 0 $$
$$ (\\lambda - 8)^2 = 0 \\Rightarrow \\lambda = 8 \\text{ (кратности 2)} $$<br>
<strong>5. Решение для $x$:</strong><br>
$$ x = C_1 e^{8t} + C_2 t e^{8t} $$<br>
<strong>6. Находим $y$:</strong><br>
$$ y = \\frac{4x - \\dot{x}}{2} = \\frac{4(C_1 e^{8t} + C_2 t e^{8t}) - (8C_1 e^{8t} + C_2 e^{8t} + 8C_2 t e^{8t})}{2} $$
$$ y = \\left(-2C_1 - \\frac{C_2}{2}\\right)e^{8t} - 2C_2 t e^{8t} $$<br>
<strong>7. Общее решение в векторной форме:</strong><br>
$$ \\bar{x}(t) = C_1 \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix} e^{8t} + C_2 \\begin{pmatrix} t \\\\ -\\frac{1}{2} - 2t \\end{pmatrix} e^{8t} $$`
            },
            {
                label: '11.4', source: 'Основная волна', cond: 'Найти общее решение неоднородной системы: $\\begin{cases} \\dot{x} = 2y - 6x + 9e^t \\\\ \\dot{y} = 2y - 8x \\end{cases}$',
                solution: `<strong>Решение:</strong><br><br>
<strong>1. Однородная система</strong><br>
$$ A = \\begin{pmatrix} -6 & 2 \\\\ -8 & 2 \\end{pmatrix} $$<br>
<strong>2. Характеристическое уравнение</strong><br>
$$ |A - \\lambda E| = \\begin{vmatrix} -6 - \\lambda & 2 \\\\ -8 & 2 - \\lambda \\end{vmatrix} = 0 $$
$$ (-6 - \\lambda)(2 - \\lambda) + 16 = 0 $$
$$ \\lambda^2 + 4\\lambda + 4 = 0 $$
$$ (\\lambda + 2)^2 = 0,\\; \\lambda = -2 \\text{ (кратности 2)} $$<br>
<strong>3. Собственный вектор</strong><br>
$$ (A + 2E)v = 0,\\; \\begin{pmatrix} -4 & 2 \\\\ -8 & 4 \\end{pmatrix} \\rightarrow v = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} $$<br>
<strong>4. Присоединённый вектор</strong><br>
$$ (A + 2E)w = v,\\; \\begin{pmatrix} -4 & 2 \\\\ -8 & 4 \\end{pmatrix} w = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} $$
$$ w = \\begin{pmatrix} t \\\\ 2t + \\frac{1}{2} \\end{pmatrix} $$<br>
<strong>5. Фундаментальная система решений ОЛДУ</strong><br>
$$ \\bar{x}_{\\text{о.о.}} = C_1 \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} e^{-2t} + C_2 \\begin{pmatrix} t \\\\ 2t + \\frac{1}{2} \\end{pmatrix} e^{-2t} $$<br>
<strong>6. Правая часть</strong><br>
$$ \\bar{f}(t) = \\begin{pmatrix} 9e^t \\\\ 0 \\end{pmatrix} $$<br>
Частота $\\alpha = 1$ не является корнем характеристического уравнения $\\lambda = -2$, поэтому $s = 0$.<br>
<strong>7. Вид частного решения</strong><br>
$$ \\bar{x}_{\\text{ч.н.}} = \\begin{pmatrix} A \\\\ B \\end{pmatrix} e^t $$<br>
<strong>8. Подставляем в систему:</strong><br>
$$ \\begin{cases} A e^t = 2B e^t - 6A e^t + 9e^t \\\\ B e^t = 2B e^t - 8A e^t \\end{cases} $$
$$ \\begin{cases} 7A - 2B = 9 \\\\ -B + 8A = 0 \\Rightarrow B = 8A \\end{cases} $$
$$ 7A - 16A = 9 \\Rightarrow A = -1,\\; B = -8 $$<br>
<strong>9. Частное решение:</strong><br>
$$ \\bar{x}_{\\text{ч.н.}} = \\begin{pmatrix} -1 \\\\ -8 \\end{pmatrix} e^t $$<br>
<strong>10. Общее решение неоднородной системы:</strong><br>
$$ \\bar{x}_{\\text{о.н.}} = C_1 \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} e^{-2t} + C_2 \\begin{pmatrix} t \\\\ 2t + \\frac{1}{2} \\end{pmatrix} e^{-2t} + \\begin{pmatrix} -1 \\\\ -8 \\end{pmatrix} e^t $$`
            },
        ]
    }
];
