import {faVolumeDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {type FunctionComponent} from 'react';
import {useVoice} from './useVoice';
import * as styles from './Pronounce.module.scss';

interface PronounceProps {
	readonly text: string;
}

const Pronounce: FunctionComponent<PronounceProps> = ({text}) => {
	const voice = useVoice();
	return (
		<button
			className={styles.pronounce}
			disabled={voice === undefined}
			onClick={() => {
				const utterance = new SpeechSynthesisUtterance(text);
				utterance.lang = 'cs-CZ';
				utterance.voice = voice!;
				window.speechSynthesis.speak(utterance);
			}}
		>
			<FontAwesomeIcon icon={faVolumeDown} />
		</button>
	);
};

export default Pronounce;
