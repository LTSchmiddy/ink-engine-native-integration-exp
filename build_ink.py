import os, subprocess
from pathlib import Path


def generate_code(cmd: list[str], code: str) -> str:
    proc = subprocess.Popen(
        cmd,
        shell=os.name == 'nt',
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    out_code, error = proc.communicate(code.encode('utf8'))
    
    if error != b'':
        raise RuntimeError(error.decode('utf8'))

    return out_code.decode('utf8')

out_dir = Path("./ink_build")
base_code  = "const Story = require('inkjs').Story;"

print("Collecting InkJs using Browserify...")
browserified_code = generate_code(["npx", "browserify", "-"], base_code)

print("Compiling with Babel...")
babeled_code = generate_code(["npx", "babel", "--no-babelrc"], browserified_code)

print("Minifying...")
mini_code = generate_code(["npx", "uglifyjs"], babeled_code)

out_dir.mkdir(exist_ok=True)
out_dir.joinpath("ink_engine.js").write_text(mini_code)
print("Done.")