import {generateDiscordActivationLink} from '@/handler/activation/generate/discord';
import {callDiscordActivationPoll} from '@/handler/activation/poll/discord';


export const PATCH = callDiscordActivationPoll;

export const POST = generateDiscordActivationLink;
