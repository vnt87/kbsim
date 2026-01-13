import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Howl } from 'howler';
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
    const switchselect = useRef();
    const layoutselect = useRef();
    const caseselect = useRef();
    const [muted, setMute] = useState(false);
    const [switchValue, setSwitchValue] = useState("0");

    // Preload sounds when switch changes
    useEffect(() => {
        for (let sound in keySounds[switchValue].press) {
            new Howl({ src: keySounds[switchValue].press[sound], volume: 0 }).play();
        }
        for (let sound in keySounds[switchValue].release) {
            new Howl({ src: keySounds[switchValue].release[sound], volume: 0 }).play();
        }
    }, [switchValue]);

    const handleSwitchChange = (e) => {
        setSwitchValue(e.target.value)
        switchselect.current.blur();
        keycontainer.current.focus();
        toast.show(`Switch sound changed to ${keySounds[e.target.value].caption} ✔️`, {
            timeout: 3000,
            pause: false,
            delay: 0,
            position: 'bottom-center',
            variant: currentTheme === "light" ? '' : 'default'
        });
    }

    const handleLayoutChange = (e) => {
        dispatch(parseKLE(keyPresets[e.target.value].kle));
        layoutselect.current.blur();
        keycontainer.current.focus();
    }

    const handleCaseChange = (e) => {
        dispatch(setKeyboardColor(keyboardColors[e.target.value].background))
        caseselect.current.blur();
        keycontainer.current.focus();
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
    const bgClass = currentTheme === 'dark' ? 'bg-[#212121]' : 'bg-white';
    const textClass = currentTheme === 'dark' ? 'text-white' : 'text-black';
    const borderClass = currentTheme === 'dark' ? 'border-[#323232]' : 'border-[#eeeeee]';
    const dropdownClass = `px-2 py-1 rounded border ${borderClass} ${bgClass} ${textClass} font-['Bai_Jamjuree'] text-sm cursor-pointer focus:outline-none`;

    return (
        <div
            className={`flex-1 flex flex-col items-center justify-start py-4 transition-colors duration-200 ${textClass} outline-none`}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={keycontainer}
            tabIndex="0"
        >
            <div className="flex flex-col items-center">
                {/* Typing Test */}
                <Suspense fallback={
                    <div className={`w-full h-24 border rounded ${borderClass}`} />
                }>
                    <TypingTest />
                </Suspense>

                {/* Controls */}
                <div className={`flex flex-wrap gap-2 items-center justify-center py-3 px-4 border rounded my-4 ${borderClass}`}>
                    <select
                        className={dropdownClass}
                        ref={switchselect}
                        aria-label="Switch Type"
                        onChange={handleSwitchChange}
                        defaultValue="0"
                    >
                        {keySounds.map((sound, index) => (
                            <option value={index} key={sound.key}>{sound.caption}</option>
                        ))}
                    </select>

                    <select
                        className={dropdownClass}
                        ref={layoutselect}
                        aria-label="Keyboard Layout"
                        onChange={handleLayoutChange}
                        defaultValue="0"
                    >
                        {keyPresets.map((preset, index) => (
                            <option value={index} key={preset.key}>{preset.caption}</option>
                        ))}
                    </select>

                    <select
                        className={dropdownClass}
                        ref={caseselect}
                        aria-label="Case Color"
                        onChange={handleCaseChange}
                        defaultValue="0"
                    >
                        {keyboardColors.map((color, index) => (
                            <option value={index} key={color.color}>{color.caption}</option>
                        ))}
                    </select>

                    <label className={`flex items-center gap-2 px-2 ${textClass} font-['Bai_Jamjuree'] text-sm cursor-pointer`}>
                        <input
                            type="checkbox"
                            onChange={toggleMute}
                            aria-label="Mute Sound"
                            className="w-4 h-4 cursor-pointer"
                        />
                        Mute
                    </label>
                </div>

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
                <ToastContainer />
            </div>
        </div>
    );
}

export default KeySimulator;
