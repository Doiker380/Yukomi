"""Crea una copia ligera para revisión sin quitar videos del proyecto original.

Uso: py tools/crear_zip_revision.py [ruta_de_salida.zip]
"""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
VIDEO_EXTENSIONS = {'.mp4', '.mkv', '.mov', '.webm', '.m4v', '.avi'}
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT.parent / 'Yukoverso_revision_sin_videos.zip'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

excluded = []
with ZipFile(OUTPUT, 'w', compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted(ROOT.rglob('*')):
        if not path.is_file() or path.resolve() == OUTPUT:
            continue
        relative = path.relative_to(ROOT).as_posix()
        if path.suffix.lower() in VIDEO_EXTENSIONS:
            excluded.append({'name': path.name, 'path': relative, 'size_bytes': path.stat().st_size})
        else:
            archive.write(path, relative)
    archive.writestr('VIDEOS_EXCLUIDOS.json', json.dumps({
        'count': len(excluded),
        'total_bytes': sum(item['size_bytes'] for item in excluded),
        'videos': excluded
    }, ensure_ascii=False, indent=2))

with ZipFile(OUTPUT) as archive:
    assert archive.testzip() is None
print(f'{OUTPUT} | {len(excluded)} videos excluidos | {OUTPUT.stat().st_size} bytes')
