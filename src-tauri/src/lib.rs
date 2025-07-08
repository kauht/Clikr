// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use enigo::{keycodes, Enigo, KeyboardControllable, MouseButton, MouseControllable, Key};
use std::time::Duration;
use std::thread::{self, JoinHandle};
use std::sync::atomic::*;
use std::sync::Arc;
use rdev::{listen, Event, EventType, Key as RdevKey};
use std::sync::Mutex;

static CLICKING: AtomicBool = AtomicBool::new(false);
static INTERVAL: AtomicU64 = AtomicU64::new(10000);
static CLICK_TYPE: AtomicU8 = AtomicU8::new(0); // 0=left | 1=right | 2=middle | 3=custom
static HOTKEY: AtomicI32 = AtomicI32::new(0);
static KEYCODE: AtomicI32 = AtomicI32::new(0); // Default to 0
static HOTKEY_KEY: Mutex<RdevKey> = Mutex::new(RdevKey::F6); // Default hotkey
static APP_FOCUSED: AtomicBool = AtomicBool::new(false);

fn auto_click() {
    let mut enigo = Enigo::new();
    loop {
        if CLICKING.load(Ordering::Relaxed) {
            thread::sleep(Duration::from_micros(INTERVAL.load(Ordering::Relaxed) as u64));
            if CLICKING.load(Ordering::Relaxed) == false {
                continue;
            }
            // Get click key and click it
            let click_type = CLICK_TYPE.load(Ordering::Relaxed);
            match click_type {
                0 => enigo.mouse_click(MouseButton::Left),
                1 => enigo.mouse_click(MouseButton::Right),
                2 => enigo.mouse_click(MouseButton::Middle),
                3 => {
                    // Use KEYCODE for custom key
                    let keycode = KEYCODE.load(Ordering::Relaxed);
                    if keycode != 0 {
                        // Use Enigo's Key::Layout for custom key
                        enigo.key_click(Key::Layout(char::from_u32(keycode as u32).unwrap_or('\0')));
                    }
                },
                _ => enigo.mouse_click(MouseButton::Left),
            }
        } else {
            // Sleep when not clicking
            thread::sleep(Duration::from_millis(100));
        }
    }
}

fn start_hotkey_listener() {
    std::thread::spawn(|| {
        if let Err(error) = listen(callback) {
            println!("Error: {:?}", error)
        }
    });
}

fn callback(event: rdev::Event) {
    if let EventType::KeyPress(key) = event.event_type {
        let hotkey = *HOTKEY_KEY.lock().unwrap();
        // Only trigger if app is NOT focused
        if key == hotkey && !APP_FOCUSED.load(Ordering::Relaxed) {
            let currently_clicking = CLICKING.load(Ordering::Relaxed);
            if currently_clicking {
                CLICKING.store(false, Ordering::Relaxed);
            } else {
                CLICKING.store(true, Ordering::Relaxed);
            }
            println!("Global hotkey pressed!");
        }
    }
}

#[tauri::command]
fn set_custom_key(key: String) -> Result<(), String> {
    println!("Custom key set to {}", key);
    // Translate key string to keycode and store in KEYCODE
    let keycode = key.chars().next().map(|c| c as i32).unwrap_or(0);
    KEYCODE.store(keycode, Ordering::Relaxed);
    Ok(())
}

#[tauri::command]
fn set_hotkey(key: String) -> Result<(), String> {
    // Map string to rdev::Key
    let rdev_key = match key.to_uppercase().as_str() {
        "F1" => RdevKey::F1,
        "F2" => RdevKey::F2,
        "F3" => RdevKey::F3,
        "F4" => RdevKey::F4,
        "F5" => RdevKey::F5,
        "F6" => RdevKey::F6,
        "F7" => RdevKey::F7,
        "F8" => RdevKey::F8,
        "F9" => RdevKey::F9,
        "F10" => RdevKey::F10,
        "F11" => RdevKey::F11,
        "F12" => RdevKey::F12,
        "A" => RdevKey::KeyA,
        "B" => RdevKey::KeyB,
        "C" => RdevKey::KeyC,
        "D" => RdevKey::KeyD,
        "E" => RdevKey::KeyE,
        "F" => RdevKey::KeyF,
        "G" => RdevKey::KeyG,
        "H" => RdevKey::KeyH,
        "I" => RdevKey::KeyI,
        "J" => RdevKey::KeyJ,
        "K" => RdevKey::KeyK,
        "L" => RdevKey::KeyL,
        "M" => RdevKey::KeyM,
        "N" => RdevKey::KeyN,
        "O" => RdevKey::KeyO,
        "P" => RdevKey::KeyP,
        "Q" => RdevKey::KeyQ,
        "R" => RdevKey::KeyR,
        "S" => RdevKey::KeyS,
        "T" => RdevKey::KeyT,
        "U" => RdevKey::KeyU,
        "V" => RdevKey::KeyV,
        "W" => RdevKey::KeyW,
        "X" => RdevKey::KeyX,
        "Y" => RdevKey::KeyY,
        "Z" => RdevKey::KeyZ,
        _ => return Err("Unsupported hotkey".to_string()),
    };
    *HOTKEY_KEY.lock().unwrap() = rdev_key;
    println!("Hotkey set to {:?}", rdev_key);
    Ok(())
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
    println!("CHANGED TO {} SECONDS", INTERVAL.load(Ordering::Relaxed) as f64 / 1000000.0 as f64);
    Ok(())
}

#[tauri::command]
fn set_click_type(click_type: u8) -> Result<(), String> {
    if click_type > 3 {
        return Err("Click type must be 0 (left), 1 (right), 2 (middle), or 3 (custom)".to_string());
    }
    CLICK_TYPE.store(click_type, Ordering::Relaxed);
    println!("Click type set to {}", click_type);
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

#[tauri::command]
fn set_app_focused(focused: bool) {
    APP_FOCUSED.store(focused, Ordering::Relaxed);
    println!("App focused: {}", focused);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    start_hotkey_listener();
    thread::spawn(|| auto_click());
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start,
            stop,
            set_interval,
            set_click_type,
            get_status,
            set_custom_key,
            set_hotkey,
            set_app_focused
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
