#include "ink_duktape.h"

duk_context* ink_ctx;

bool init_ink() {
    ink_ctx = duk_create_heap_default();

    if (!ink_ctx) { return false; }
    return true;
}

void shutdown_ink() {
    duk_destroy_heap(ink_ctx);
}