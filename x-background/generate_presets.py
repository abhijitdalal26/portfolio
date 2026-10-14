import os
import math
from PIL import Image

PALETTE_SETS = {
    "blue": {
        "dark": [
            [0.00, [18, 18, 18]],
            [0.32, [26, 41, 66]],
            [0.60, [59, 130, 246]],
            [0.84, [147, 197, 253]],
            [1.00, [242, 240, 237]],
        ],
        "light": [
            [0.00, [250, 250, 249]],
            [0.32, [219, 234, 254]],
            [0.60, [37, 99, 235]],
            [0.84, [30, 58, 138]],
            [1.00, [17, 17, 16]],
        ],
    },
    "fire": {
        "dark": [
            [0.00, [12, 9, 8]],
            [0.28, [64, 16, 10]],
            [0.55, [201, 60, 20]],
            [0.78, [244, 143, 22]],
            [1.00, [255, 245, 202]],
        ],
        "light": [
            [0.00, [250, 250, 249]],
            [0.28, [250, 213, 165]],
            [0.55, [224, 110, 24]],
            [0.78, [140, 32, 15]],
            [1.00, [28, 10, 6]],
        ],
    },
}

WAYPOINTS = {
    "rabbit": (-0.4, 0.6),
    "dendrite": (-0.8, 0.156),
    "frost": (-0.7269, 0.1889),
    "filament": (-0.194, 0.6557),
    "sparkle": (0.28, 0.008),
}

MAX_ITER = 130
LN2 = math.log(2)

def lerp(a, b, t):
    return a + (b - a) * t

def color_at(t, stops):
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t >= t0 and t <= t1:
            lt = (t - t0) / ((t1 - t0) or 1.0)
            return (
                int(round(lerp(c0[0], c1[0], lt))),
                int(round(lerp(c0[1], c1[1], lt))),
                int(round(lerp(c0[2], c1[2], lt)))
            )
    return stops[-1][1]

def build_lut(max_iter, stops):
    lut = []
    for i in range(max_iter + 1):
        t = math.pow(i / max_iter, 0.45)
        lut.append(color_at(t, stops))
    return lut

def render_julia(width, height, cx, cy, lut):
    aspect = width / height
    img = Image.new("RGB", (width, height))
    pixels = img.load()

    for py in range(height):
        y = (py / height - 0.5) * (3.0 / aspect)
        for px in range(width):
            x = (px / width - 0.5) * 3.0
            zx, zy = x, y
            zx2, zy2 = zx * zx, zy * zy
            iter_count = 0
            while zx2 + zy2 <= 4.0 and iter_count < MAX_ITER:
                zy = 2.0 * zx * zy + cy
                zx = zx2 - zy2 + cx
                zx2 = zx * zx
                zy2 = zy * zy
                iter_count += 1

            if iter_count >= MAX_ITER:
                off = MAX_ITER
            else:
                log_zn = math.log(zx2 + zy2) / 2.0
                nu = math.log(log_zn / LN2) / LN2
                smooth = max(0, min(MAX_ITER, int(round(iter_count + 1 - nu))))
                off = smooth

            pixels[px, py] = lut[off]
    return img

def main():
    print("Generating presets. This might take a few seconds...")
    width, height = 1500, 500
    os.makedirs("presets", exist_ok=True)

    presets = [
        ("rabbit", "blue", "dark"),
        ("rabbit", "fire", "dark"),
        ("frost", "blue", "dark"),
        ("frost", "fire", "dark"),
        ("dendrite", "blue", "dark"),
        ("filament", "fire", "dark"),
    ]

    for wp_name, palette_name, theme_name in presets:
        cx, cy = WAYPOINTS[wp_name]
        stops = PALETTE_SETS[palette_name][theme_name]
        lut = build_lut(MAX_ITER, stops)
        
        filename = f"presets/{wp_name}_{palette_name}_{theme_name}.png"
        print(f"Rendering {filename}...")
        img = render_julia(width, height, cx, cy, lut)
        img.save(filename)
        print(f"Saved {filename}")

if __name__ == "__main__":
    main()
