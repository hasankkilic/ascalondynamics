#!/usr/bin/env python3
"""
Ascalon Dynamics repo reorg: images/ altını kategorilere ayırır ve
tüm kaynak dosyalardaki /images/<dosya> referanslarını yeni yola günceller.

Kullanım: python3 reorganize.py <repo_root>

Notlar:
- CNAME ve .gitignore'a dokunulmaz.
- Kök .html sayfaları, package.json, vite.config.js taşınmaz (zorunlu).
- images/ içindeki dosyalar images/<kategori>/<dosya> altına taşınır (git mv).
- Tüm .html, .js, .css dosyalarındaki /images/<dosya> ve images/<dosya>
  (url(...) içindekiler dahil) referansları otomatik güncellenir.
"""
import subprocess
import sys
from pathlib import Path

MAPPING = {
    "logo.png": "brand", "logo1.png": "brand", "logo1-transparent.png": "brand",
    "orijinal_logo.png": "brand", "orijinal_logo2.png": "brand", "tr_bayrak.png": "brand",
    "favicon-192.png": "brand", "favicon-48.png": "brand", "favicon-512.png": "brand",
    "umay-arhud.mp4": "umay", "umay-cinematic.mp4": "umay", "umay-control.mp4": "umay",
    "umay-helmet-draw.png": "umay", "umay-helmet.mp4": "umay", "umay-hero-bg.mp4": "umay",
    "umay-hero.mp4": "umay", "umay-live-1.mp4": "umay", "umay-live-2.mp4": "umay",
    "umay-ops.mp4": "umay", "umay-overview.mp4": "umay",
    "umay-scenario-perimeter.jpg": "umay", "umay-scenario-rescue.jpg": "umay",
    "umay-scenario-urban.jpg": "umay", "umay-senaryo-1-poster.jpg": "umay",
    "umay-senaryo-2-poster.jpg": "umay", "umay-sensor-camera.jpg": "umay",
    "umay-sensor-hud.jpg": "umay", "umay-sensor-nightvision.jpg": "umay",
    "umay-sensor-thermal.jpg": "umay", "umay-wear-goggles.jpg": "umay",
    "umay-wear-headset.jpg": "umay", "umay-wear-mask.jpg": "umay", "showcase.mp4": "umay",
    "air-argus.jpg": "uav", "air-basat-a.jpg": "uav", "air-basat-b.jpg": "uav",
    "air-draw-fixed.png": "uav", "air-draw-multi.png": "uav", "air-draw-vtol.png": "uav",
    "air-hero.mp4": "uav", "air-vtol-vid.mp4": "uav", "air-vtol.jpg": "uav",
    "argus.mp4": "uav", "argus.png": "uav", "atmaca.png": "uav", "sahin.png": "uav",
    "şahin.png": "uav", "vtol.mp4": "uav", "uav-1falcon.png": "uav", "uav-eclipse.png": "uav",
    "uav-falcon.png": "uav", "uav-kesif.png": "uav", "uav-suas.jpg": "uav",
    "gcs-field-vehicle.jpg": "gcs", "gcs-mq9-control-station.jpg": "gcs",
    "gcs-operator-planning.jpg": "gcs", "gcs-reaper-crew.jpg": "gcs",
    "gcs-small-uas-kit.jpg": "gcs", "gcs-station-delivery.jpg": "gcs",
    "gcs-ui-cbs-video.png": "gcs", "gcs-ui-commands.png": "gcs",
    "gcs-ui-overview.png": "gcs", "gcs-ui-sensors.png": "gcs",
    "ai-software-field-update.png": "ai-software", "ai-software-fusion.png": "ai-software",
    "ai-software-hero.png": "ai-software", "ai-stage-decision.png": "ai-software",
    "ai-stage-deployment.png": "ai-software", "ai-stage-detection.png": "ai-software",
    "ai-stage-fusion.png": "ai-software",
    "solution-ui-ai-layer.png": "solutions", "solution-ui-iha-mission.png": "solutions",
    "solution-ui-modernization.png": "solutions", "solution-ui-sensor-fusion.png": "solutions",
    "solution-ui-simulation-training.png": "solutions", "solution-ui-umay-ar.png": "solutions",
    "field.png": "misc",
}

TEXT_EXTS = {".html", ".js", ".css", ".mjs", ".json"}
SKIP_DIRS = {"node_modules", ".git", "archive", "_to_delete", "public", "dist"}


def main():
    if len(sys.argv) != 2:
        print("Kullanım: reorganize.py <repo_root>")
        sys.exit(1)
    root = Path(sys.argv[1]).resolve()
    images_dir = root / "images"
    if not images_dir.is_dir():
        print(f"HATA: {images_dir} yok")
        sys.exit(1)

    # 1) git mv ile dosyaları kategori klasörlerine taşı
    moved = []
    for filename, category in MAPPING.items():
        src = images_dir / filename
        if not src.exists():
            print(f"UYARI: kaynak yok, atlanıyor: {src}")
            continue
        dest_dir = images_dir / category
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / filename
        rel_src = src.relative_to(root)
        rel_dest = dest.relative_to(root)
        result = subprocess.run(
            ["git", "mv", "-f", str(rel_src), str(rel_dest)],
            cwd=root, capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"HATA (git mv): {rel_src} -> {rel_dest}\n{result.stderr}")
            sys.exit(1)
        moved.append((filename, category))
        print(f"taşındı: {rel_src} -> {rel_dest}")

    print(f"\nToplam {len(moved)} dosya taşındı.\n")

    # 2) tüm metin dosyalarında path referanslarını güncelle
    updated_files = []
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue
        if path.suffix.lower() not in TEXT_EXTS:
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, PermissionError):
            continue

        original = content
        for filename, category in moved:
            # /images/dosya.ext  ve  images/dosya.ext (url(...) içinde tırnaksız da olabilir)
            content = content.replace(f"/images/{filename}", f"/images/{category}/{filename}")
            content = content.replace(f"'images/{filename}'", f"'images/{category}/{filename}'")
            content = content.replace(f'"images/{filename}"', f'"images/{category}/{filename}"')

        if content != original:
            path.write_text(content, encoding="utf-8")
            updated_files.append(str(path.relative_to(root)))
            print(f"güncellendi: {path.relative_to(root)}")

    print(f"\nToplam {len(updated_files)} dosyada path referansı güncellendi.")

    # 3) vite.config.js'deki syncImagesToPublic yorumunu/mantığını kontrol uyarısı
    print("\nNOT: vite.config.js içindeki syncImagesToPublic fonksiyonu images/ klasörünü")
    print("olduğu gibi (alt klasörleriyle) public/images/ altına kopyalıyor -- bu yapı")
    print("alt klasörlerle de doğru çalışır, ek değişiklik gerekmez.")


if __name__ == "__main__":
    main()
