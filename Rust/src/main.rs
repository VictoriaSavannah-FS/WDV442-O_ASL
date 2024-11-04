// This is the main function - from Rust website
use chrono::Local;
fn main() {
    // Statements here are executed when the compiled binary is called.

    // Print text to the console.
    println!("Hello ASL!");
    println!("I'm a Rustacean - hahaha! Not quite... but maybe one day.");
    println!("Today is: {}", Local::now().format("%Y-%m-%d %H:%M:%S"));
}
