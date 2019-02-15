import useButtonStyle from './use-button-style';

/**
 * useButtonStateClasses is a hook that returns different CSS classes based
 * on the current state (active/inactive) of the element.
 *
 * @return {String} A string with the state CSS classes.
 */
export default function useButtonStateClasses(style) {
	const [isActive, _style] = useButtonStyle(style);
	return isActive ? 'ae-button-pressed' : '';
}
