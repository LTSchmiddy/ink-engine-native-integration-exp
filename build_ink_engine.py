# This script converts the ink script into a C header file, so that the Ink engine can be embedded
# directly into the application, instead of needing to be added via an additional file.

import os, subprocess
import pathlib
from pathlib import Path


def process(paths: list[Path], out_path: Path):
    engine_code = ""
    for i in paths:
        engine_code = i.read_text() + "\n"

    out_path.with_suffix(".js").write_text(engine_code)
    
    engine_bytes = [i for i in engine_code.encode('utf8')]
    
    engine_header = out_path.with_suffix(".h").open("w")
        
    engine_header.write(f"int ink_engine_data_size = {len(engine_bytes)}; unsigned char ink_engine_data[] = {{")
    
    for i in engine_bytes:
        engine_header.write(hex(i)+",")

    engine_header.write("};")




out_dir = Path("./ink_build")
out_dir.mkdir(exist_ok=True)

process(
    [Path("./src/ink_engine/ink.js")],
    out_dir.joinpath("ink_engine_data_dev")
)

process(
    [Path("./src/ink_engine/ink.min.js")],
    out_dir.joinpath("ink_engine_data")
)
