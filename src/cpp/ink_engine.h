#define DUK_USE_CPP_EXCEPTIONS 1

#include <iostream>

#include "duktape/duktape.h"
#include "duktape/duk_print_alert.h"
#include "duktape/duk_console.h"

extern duk_context* ink_ctx;

bool init_ink();
void load_js_file(std::string filename);
void shutdown_ink();