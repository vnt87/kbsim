import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Howl } from 'howler';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import {
    parseKLE,
    keyDown,
    keyUp,
    setKeyboardColor,
    selectLayout,
    selectLocations,
    selectPressedKeys,
    selectKeyboardStyle,
} from './keySimulatorSlice';
import { keySounds } from '../../lib/audio/audioModule.js';
import { keynames } from '../../lib/keyboard/keycodeMaps.js';
import { keyPresets } from '../../lib/keyboard/keyPresets.js'
import { keyboardColors } from '../../lib/keyboard/keyboardColors.js'
import { keyCodeOf } from '../../lib/keyboard/parseModules.js'
import { ToastContainer, toast } from '../../components/toast/toast.js';
import Key from '../key/Key.jsx';
import store from '../store/store';
import { SecureFrame } from '../../components/ui/SecureFrame.jsx';

const TypingTest = React.lazy(() => import('../typingTest/TypingTest.jsx'));

// initially render a keyboard
store.dispatch(parseKLE(keyPresets[0].kle));
// intially render the keyboard color
store.dispatch(setKeyboardColor(keyboardColors[0].background));

function KeySimulator() {
    const currentTheme = useSelector((state) => state.themeProvider.current);
    const theme = useSelector((state) => state.themeProvider.theme);
    const layout = useSelector(selectLayout);
    const keyLocations = useSelector(selectLocations);
    const pressedKeys = useSelector(selectPressedKeys);
    const keyboardStyle = useSelector(selectKeyboardStyle);

    const dispatch = useDispatch();

    const keycontainer = useRef();
    const [muted, setMute] = useState(false);
    const [switchValue, setSwitchValue] = useState("0");
    const [layoutIndex, setLayoutIndex] = useState(0);
    const [caseIndex, setCaseIndex] = useState(0);

    // Preload sounds when switch changes
    useEffect(() => {
        for (let sound in keySounds[switchValue].press) {
            new Howl({ src: keySounds[switchValue].press[sound], volume: 0 }).play();
        }
        for (let sound in keySounds[switchValue].release) {
            new Howl({ src: keySounds[switchValue].release[sound], volume: 0 }).play();
        }
    }, [switchValue]);

    const handleSwitchChange = (val) => {
        setSwitchValue(val)
        // keycontainer.current.focus(); // Optional: keep focus logic if needed, but usually clicking a button focuses it. 
        // With simplified handlers we might want to refocus keycontainer to keep typing active?
        // Let's keep it safe.
        if (keycontainer.current) keycontainer.current.focus();

        toast.show(`Switch sound changed to ${keySounds[val].caption} ✔️`, {
            timeout: 3000,
            pause: false,
            delay: 0,
            position: 'bottom-center',
            variant: currentTheme === "light" ? '' : 'default'
        });
    }

    const handleLayoutChange = (val) => {
        setLayoutIndex(val);
        dispatch(parseKLE(keyPresets[val].kle));
        if (keycontainer.current) keycontainer.current.focus();
    }

    const handleCaseChange = (val) => {
        setCaseIndex(val);
        dispatch(setKeyboardColor(keyboardColors[val].background))
        if (keycontainer.current) keycontainer.current.focus();
    }

    const toggleMute = () => {
        setMute(!muted);
    }

    // Handle keyboard key down
    const handleKeyDown = (e) => {
        if (e.keyCode === 18 || e.keyCode === 112 ||
            e.keyCode === 114 || e.keyCode === 116 || e.keyCode === 117 ||
            e.keyCode === 121 || e.keyCode === 122 || e.keyCode === 123) {
            e.preventDefault();
        }
        for (let coords in keyLocations[keynames[e.keyCode]]) {
            let action = {
                x: keyLocations[keynames[e.keyCode]][coords][0],
                y: keyLocations[keynames[e.keyCode]][coords][1],
                keycode: e.keyCode,
            };
            dispatch(keyDown(action));
        }
        if (!muted && keyLocations[keynames[e.keyCode]] && !pressedKeys.includes(e.keyCode) && keySounds[switchValue]) {
            if (keynames[e.keyCode] in keySounds[switchValue].press) {
                new Howl({ src: keySounds[switchValue].press[keynames[e.keyCode]] }).play();
            } else {
                switch (parseInt(keyLocations[keynames[e.keyCode]][0][0])) {
                    case 0: new Howl({ src: [keySounds[switchValue].press.GENERICR0] }).play(); break;
                    case 1: new Howl({ src: keySounds[switchValue].press.GENERICR1 }).play(); break;
                    case 2: new Howl({ src: keySounds[switchValue].press.GENERICR2 }).play(); break;
                    case 3: new Howl({ src: keySounds[switchValue].press.GENERICR3 }).play(); break;
                    case 4: new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play(); break;
                    default: new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play(); break;
                }
            }
        }
    }

    // Handle keyboard key up
    const handleKeyUp = (e) => {
        for (let coords in keyLocations[keynames[e.keyCode]]) {
            let action = {
                x: keyLocations[keynames[e.keyCode]][coords][0],
                y: keyLocations[keynames[e.keyCode]][coords][1],
                keycode: e.keyCode,
            };
            dispatch(keyUp(action));
        }
        if (!muted && keyLocations[keynames[e.keyCode]] && keySounds[switchValue]) {
            if (keynames[e.keyCode] in keySounds[switchValue].press) {
                new Howl({ src: keySounds[switchValue].release[keynames[e.keyCode]] }).play();
            } else {
                new Howl({ src: keySounds[switchValue].release.GENERIC }).play();
            }
        }
    }

    // Mouse handlers for clicking keys
    const handleKeyMouseDown = (primaryLegend) => {
        for (let coords in keyLocations[primaryLegend]) {
            let action = {
                x: keyLocations[primaryLegend][coords][0],
                y: keyLocations[primaryLegend][coords][1],
                keycode: keyCodeOf(primaryLegend),
            };
            dispatch(keyDown(action));
        }
        if (!muted && keyLocations[primaryLegend] && !pressedKeys.includes(keyCodeOf(primaryLegend)) && keySounds[switchValue]) {
            if (primaryLegend in keySounds[switchValue].press) {
                new Howl({ src: keySounds[switchValue].press[primaryLegend] }).play();
            } else {
                switch (parseInt(keyLocations[primaryLegend][0][0])) {
                    case 0: new Howl({ src: [keySounds[switchValue].press.GENERICR0] }).play(); break;
                    case 1: new Howl({ src: keySounds[switchValue].press.GENERICR1 }).play(); break;
                    case 2: new Howl({ src: keySounds[switchValue].press.GENERICR2 }).play(); break;
                    case 3: new Howl({ src: keySounds[switchValue].press.GENERICR3 }).play(); break;
                    case 4: new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play(); break;
                    default: new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play(); break;
                }
            }
        }
    }

    const handleKeyMouseUp = (primaryLegend) => {
        for (let coords in keyLocations[primaryLegend]) {
            let action = {
                x: keyLocations[primaryLegend][coords][0],
                y: keyLocations[primaryLegend][coords][1],
                keycode: keyCodeOf(primaryLegend),
            };
            dispatch(keyUp(action));
        }
        if (!muted && keyLocations[primaryLegend] && keySounds[switchValue]) {
            if (primaryLegend in keySounds[switchValue].press) {
                new Howl({ src: keySounds[switchValue].release[primaryLegend] }).play();
            } else {
                new Howl({ src: keySounds[switchValue].release.GENERIC }).play();
            }
        }
    }

    // Tailwind classes for theme
    const textClass = currentTheme === 'dark' ? 'text-white' : 'text-black';
    const borderClass = currentTheme === 'dark' ? 'border-[#323232]' : 'border-[#eeeeee]';

    return (
        <div
            className={`flex-1 flex flex-col items-center justify-start py-4 transition-colors duration-200 ${textClass} outline-none`}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={keycontainer}
            tabIndex="0"
        >
            {/* Wrap everything in SecureFrame */}
            <SecureFrame
                accentColor={currentTheme === 'dark' ? '#4ade80' : '#22c55e'}
                className="p-4"
            >
                <div className="flex flex-col items-center">
                    {/* Typing Test */}
                    <Suspense fallback={
                        <div className={`w-full h-24 border rounded ${borderClass}`} />
                    }>
                        <TypingTest />
                    </Suspense>

                    {/* Keyboard */}
                    <div
                        className="relative rounded-lg"
                        style={keyboardStyle}
                    >
                        {layout.map((row, index) => (
                            <div className="flex" key={index}>
                                {row.map((key) => (
                                    <Key
                                        key={key.keyid}
                                        className={key.class}
                                        legend={key.legend}
                                        sublegend={key.sublegend}
                                        width={key.width}
                                        height={key.height}
                                        x={key.x}
                                        y={key.y}
                                        keytopcolor={key.keytopcolor}
                                        keybordercolor={key.keybordercolor}
                                        textcolor={key.textcolor}
                                        pressed={key.pressed}
                                        mouseDown={handleKeyMouseDown}
                                        mouseUp={handleKeyMouseUp}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Controls wrapped in SecureFrame */}
                    <SecureFrame
                        accentColor={currentTheme === 'dark' ? '#4ade80' : '#22c55e'}
                        className="w-full max-w-5xl my-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 px-4">

                            {/* Switch Type Column */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Switch Type
                                    </span>
                                    <button
                                        onClick={toggleMute}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-colors ${muted
                                            ? (currentTheme === 'dark'
                                                ? 'bg-red-600 text-white hover:bg-red-500'
                                                : 'bg-red-500 text-white hover:bg-red-600')
                                            : (currentTheme === 'dark'
                                                ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200')
                                            }`}
                                    >
                                        {muted ? (
                                            <SpeakerXMarkIcon className="w-4 h-4" />
                                        ) : (
                                            <SpeakerWaveIcon className="w-4 h-4" />
                                        )}
                                        {muted ? 'Muted' : 'Sound On'}
                                    </button>
                                </div>
                                <div className={`flex flex-wrap gap-2 ${muted ? 'opacity-50 pointer-events-none' : ''}`}>
                                    {keySounds.map((sound, index) => {
                                        const isActive = String(switchValue) === String(index);
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleSwitchChange(index)}
                                                disabled={muted}
                                                className={`
                                            px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                                            ${isActive
                                                        ? (currentTheme === 'dark'
                                                            ? 'bg-white text-black shadow-sm'
                                                            : 'bg-black text-white shadow-sm')
                                                        : (currentTheme === 'dark'
                                                            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black')
                                                    }
                                        `}
                                            >
                                                {sound.caption}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Keyboard Layout Column */}
                            <ToggleGroup
                                label="Keyboard Layout"
                                options={keyPresets}
                                value={layoutIndex}
                                onChange={handleLayoutChange}
                                currentTheme={currentTheme}
                            />

                            {/* Case Color Column */}
                            <div className="flex flex-col gap-3">
                                <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Case Color
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {keyboardColors.map((color, index) => {
                                        const isActive = caseIndex === index;
                                        // Simplified contrast check: "black" and "gray" (if dark enough) might need white text
                                        const isDark = color.color === 'black';

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleCaseChange(index)}
                                                className={`
                                            px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all shadow-sm
                                            border ${currentTheme === 'dark' ? 'border-white/10' : 'border-black/10'}
                                            ${isActive
                                                        ? (currentTheme === 'dark' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#212121]' : 'ring-2 ring-black ring-offset-2 ring-offset-white')
                                                        : 'hover:scale-105 active:scale-95'}
                                        `}
                                                style={{
                                                    background: color.background,
                                                    color: isDark ? 'white' : 'black',
                                                    textShadow: !isDark ? '0 0 2px rgba(255,255,255,0.5)' : 'none'
                                                }}
                                            >
                                                {color.caption}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </SecureFrame>
                    <ToastContainer />
                </div>
            </SecureFrame>
        </div>
    );
}

export default KeySimulator;

function ToggleGroup({ label, options, value, onChange, currentTheme }) {
    return (
        <div className="flex flex-col gap-3">
            <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {label}
            </span>
            <div className="flex flex-wrap gap-2">
                {options.map((option, index) => {
                    const isActive = String(value) === String(index);
                    return (
                        <button
                            key={index}
                            onClick={() => onChange(index)}
                            className={`
                               px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                               ${isActive
                                    ? (currentTheme === 'dark'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'bg-black text-white shadow-sm')
                                    : (currentTheme === 'dark'
                                        ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black')
                                }
                           `}
                        >
                            {option.caption}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
