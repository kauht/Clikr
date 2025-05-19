// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Libraries
use std::thread::{self, JoinHandle};
use std::time::Duration;
use std::sync::{Arc, Mutex};
use std::sync::atomic::{AtomicBool, Ordering};


static interval: u64 = 0;

static CLICKER_THREAD: Arc<AtomicBool> = Arc::new(AtomicBool::new(false));

fn main() {
    first_lib::run()

    
}

// Starts Clicker Thread
// Clicks until Clicker Thread is stopped
#[tauri::command]
fn begin_clicker(ms_interval: i32, button: String, position: Vec<i32>) {
    static VALUE: bool = CLICKER_THREAD.load(Ordering::Relaxed);
    let CLICKER_THREAD_CLONE: Arc<AtomicBool> = Arc::clone(&CLICKER_THREAD);

    handler.join().unwrap();

    
}
// Ends Clicker Thread
#[tauri::command]
fn end_clicker() {
    
}