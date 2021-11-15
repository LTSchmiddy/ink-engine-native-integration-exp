#include <iostream>

#include "ink_engine.h"


std::string get_ink_engine_code() {

    std::string engine_code = "";

    for (int i = 0; i < ink_engine_data_size; i++) {
        engine_code += ink_engine_data[i];
    }

    return engine_code;
}
