import React, {createContext, type FunctionComponent, type PropsWithChildren, useContext, useEffect, useState} from 'react';

const VoiceContext = createContext<SpeechSynthesisVoice | undefined>(undefined);

export const VoiceProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
	const [voice, setVoice] = useState<SpeechSynthesisVoice>();
	useEffect(() => {
		const setCzechVoice = (voices: SpeechSynthesisVoice[]) => {
			const czech = voices.filter((voice) => voice.lang === 'cs-CZ');
			if (czech.length > 0) {
				setVoice(czech[0]);
			}
		};

		const voices = window.speechSynthesis.getVoices();
		if (voices.length > 0) {
			setCzechVoice(voices);
			return;
		}

		window.speechSynthesis.addEventListener('voiceschanged', () => {
			const voices = window.speechSynthesis.getVoices();
			setCzechVoice(voices);
		});
	}, []);

	return (
		<VoiceContext.Provider value={voice}>
			{children}
		</VoiceContext.Provider>
	);
};

export const useVoice = () => useContext(VoiceContext);
