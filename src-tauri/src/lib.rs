// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use mouse_keyboard_input::*;
use std::time::Duration;
use std::thread::{self};
use std::sync::atomic::*;

static CLICKING: AtomicBool = AtomicBool::new(false);
static INTERVAL: AtomicU32 = AtomicU32::new(1000);

fn auto_click() {
    thread::spawn(|| {
        let mut mouse = VirtualDevice::default().unwrap();
        loop {
            if !CLICKING.load(Ordering::Relaxed) {
                continue;
            }
            thread::sleep(Duration::from_micros(INTERVAL.load(Ordering::Relaxed) as u64 ));
            mouse.click(BTN_LEFT).unwrap();
        }
    });
}

#[tauri::command]
fn toggle_clicker(interval: u32) {
    INTERVAL.store(interval, Ordering::Relaxed);
    CLICKING.store(!CLICKING.load(Ordering::Relaxed), Ordering::Relaxed);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![toggle_clicker])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
