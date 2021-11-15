target_sources(
    ${TARGET_NAME} 
    PUBLIC
    "./ink_engine.cpp"
)

add_subdirectory("./duktape")