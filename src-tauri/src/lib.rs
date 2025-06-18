// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use enigo::{Enigo, MouseControllable, MouseButton};
use std::time::Duration;
use std::thread::{self, JoinHandle};
use std::sync::atomic::*;
use std::sync::Arc;

static CLICKING: AtomicBool = AtomicBool::new(false);
static INTERVAL: AtomicU64 = AtomicU64::new(10000);
static CLICK_TYPE: AtomicU8 = AtomicU8::new(0); // 0=left | 1=right | 2=middle

fn auto_click() {
    let mut enigo = Enigo::new();
    loop {
        if CLICKING.load(Ordering::Relaxed) {
            thread::sleep(Duration::from_micros(INTERVAL.load(Ordering::Relaxed) as u64));
            
            // Get click key and click it
            let click_type = CLICK_TYPE.load(Ordering::Relaxed);
            let button = match click_type {
                0 => MouseButton::Left,
                1 => MouseButton::Right,
                2 => MouseButton::Middle,
                _ => MouseButton::Left,
            };
            enigo.mouse_click(button);
        } else {
            // Sleep when not clicking
            thread::sleep(Duration::from_millis(100));
        }
    }
}

#[tauri::command]
fn start() -> Result<(), String> {
    CLICKING.store(true, Ordering::Relaxed);
    Ok(())
}

#[tauri::command]
fn stop() -> Result<(), String> {
    CLICKING.store(false, Ordering::Relaxed);
    Ok(())
}

#[tauri::command]
fn set_interval(micros: u64) -> Result<(), String> {
    if micros < 10 {
        return Err("Interval has to be at least 10 microseconds (0.01ms)".to_string());
    }
    INTERVAL.store(micros, Ordering::Relaxed);
    Ok(())
}

#[tauri::command]
fn set_click_type(click_type: u8) -> Result<(), String> {
    if click_type > 2 {
        return Err("Click type must be 0 (left), 1 (right), or 2 (middle)".to_string());
    }
    CLICK_TYPE.store(click_type, Ordering::Relaxed);
    Ok(())
}

#[tauri::command]
fn get_status() -> Result<serde_json::Value, String> {
    Ok(serde_json::json!({
        "clicking": CLICKING.load(Ordering::Relaxed),
        "interval": INTERVAL.load(Ordering::Relaxed),
        "click_type": CLICK_TYPE.load(Ordering::Relaxed)
    }))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    thread::spawn(|| auto_click());
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start,
            stop,
            set_interval,
            set_click_type,
            get_status
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
