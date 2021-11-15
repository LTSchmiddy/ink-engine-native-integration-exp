#include <iostream>

#include "ink_engine.h"



int main() {
    init_ink();
    load_js_file("story.js");
    duk_eval_string(ink_ctx, "var story = new inkjs.Story(storyContent);");



    shutdown_ink(); 
}