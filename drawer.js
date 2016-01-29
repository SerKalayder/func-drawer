function draw() {
    var canvas = document.getElementById("canvas");
    if (null == canvas || !canvas.getContext) return;

    var axes = {}, ctx = canvas.getContext("2d");
    axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
    axes.scale = 40;                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;

    var f = document.getElementById("expression").value;
    f = exTransform(f);

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    showAxes(ctx, axes);
    funGraph(ctx, axes, f, "rgb(255,51,0)", 1);
}

function funGraph(ctx, axes, func, color, thick) {
    var xx, yy, dx = 4, x0 = axes.x0, y0 = axes.y0, scale = axes.scale;
    var iMax = Math.round((ctx.canvas.width - x0) / dx);
    var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (var i = iMin; i <= iMax; i++) {
        xx = dx * i;
        var arg = xx / scale;
        var toEval = func.replace("x", arg);
        yy = scale * eval(toEval);
        if (i == iMin) ctx.moveTo(x0 + xx, y0 - yy);
        else ctx.lineTo(x0 + xx, y0 - yy);
    }
    ctx.stroke();
}

function showAxes(ctx, axes) {
    var x0 = axes.x0, w = ctx.canvas.width;
    var y0 = axes.y0, h = ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xmin, y0); ctx.lineTo(w, y0);  // X axis
    ctx.moveTo(x0, 0); ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();
}

function makeAxes() {
    var canvas = document.getElementById("canvas");
    if (null == canvas || !canvas.getContext) return;

    var axes = {}, ctx = canvas.getContext("2d");
    axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
    axes.scale = 40;                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;

    showAxes(ctx, axes)
}

/////////////////////////////////////////////////////////////////////////////////
function add(item) {
    var ex = document.getElementById("expression");
    ex.value += item;
}
function del() {
    var ex = document.getElementById("expression");
    ex.value = ex.value.substring(0, ex.value.length - 1);
}
function c() {
    var ex = document.getElementById("expression");
    ex.value = "";
}

function exTransform(func) {
    func = func.replace(/acos/g, "V");
    func = func.replace(/cos/g, "Math.cos");
    func = func.replace(/V/g, "Math.acos");

    func = func.replace(/asin/g, "V");
    func = func.replace("/sin/g", "Math.sin");
    func = func.replace(/V/g, "Math.asin");

    func = func.replace(/atan/g, "V");
    func = func.replace("/tan/g", "Math.tan");
    func = func.replace(/V/g, "Math.atan");

    func = func.replace(/exp/g, "V");
    func = func.replace(/e/g, "Math.E");
    func = func.replace(/V/g, "Math.exp");

    func = func.replace(/abs/g, "Math.abs");
    func = func.replace(/log/g, "Math.log");
    func = func.replace(/pow/g, "Math.pow");
    func = func.replace(/sqrt/g, "Math.sqrt");
    func = func.replace(/Pi/g, "Math.PI");

    return func;
}