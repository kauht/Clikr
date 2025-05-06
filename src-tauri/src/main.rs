// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Libraries
use std::thread::{self, JoinHandle};
use std::time::Duration;

static interval: u64 = 0;

// static mut CLICKER_THREAD: JoinHandle<()> = thread::spawn(|| {
//     loop {
//         thread::sleep(Duration::from_millis(interval));
        
//     }
// })

fn main() {
    first_lib::run()

    
}

// Starts Clicker Thread
// Clicks until Clicker Thread is stopped
#[tauri::command]
fn begin_clicker(ms_interval: i32, button: String, position: Vec<i32>) {
    
}
// Ends Clicker Thread
#[tauri::command]
fn end_clicker() {
    
}