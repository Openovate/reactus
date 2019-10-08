import { Exception } from '@openovate/jsm';

/**
 * The purpose of this is, when errors are thrown
 * in `reactus`. You will know the error was thrown
 * from the `reactus` library
 */
export default class ReactusException extends Exception {}
