#include <iostream>
#include <fstream>

#include "duktape.h"
#include "ink_duktape.h"



int main() {
    init_ink();
    duk_eval_string(ink_ctx, "print('Hello world from Javascript!');");

    shutdown_ink();
}