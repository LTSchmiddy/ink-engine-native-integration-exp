#include "ink_engine.h"

#include <fstream>
#include <streambuf>

#ifdef DEBUG
    #define INK_ENGINE_DATA_MODE "dev"
    #include "ink_engine_data_dev.h"
#else
    #define INK_ENGINE_DATA_MODE "min"
    #include "ink_engine_data.h"
#endif


duk_context* ink_ctx;
static void error_handler(void *udata, const char *msg) {
    (void) udata;  /* ignored in this case, silence warning */

    /* Note that 'msg' may be NULL. */
    fprintf(stderr, "*** FATAL ERROR: %s\n", (msg ? msg : "no message"));
    fflush(stderr);
    abort();
}

static std::string get_ink_engine_code() {

    std::string engine_code = "";

    for (int i = 0; i < ink_engine_data_size; i++) {
        engine_code += ink_engine_data[i];
    }

    return engine_code;
}

bool init_ink() {
    ink_ctx = duk_create_heap(NULL, NULL, NULL, NULL, error_handler);
    if (!ink_ctx) { return false; }

    duk_print_alert_init(ink_ctx, 0 /*flags*/);
    std::cout << "Ink Engine Data Mode: " << INK_ENGINE_DATA_MODE <<std::endl;

    duk_eval_string(ink_ctx, get_ink_engine_code().c_str());

    return true;
}

void shutdown_ink() {
    duk_destroy_heap(ink_ctx);
}

void load_js_file(std::string filename) {

    std::ifstream js_file = std::ifstream(filename);    
    std::string str((std::istreambuf_iterator<char>(js_file)), std::istreambuf_iterator<char>());

    duk_eval_string(ink_ctx, str.c_str());
    
    js_file.close();
}