// USER
export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    jwt: string;
}

export type UserCollection = {
    _id: string;
    user_id: string;
    user_collection: CardEntry[];
}

export type CardEntry = {
    card_id: string;
    quantity: number;
}

// CARDS
export enum Rarity {
    COMMON = 'C',
    UNCOMMON = 'UC',
    RARE = 'R',
    SUPER_RARE = 'SR',
    LEADER = 'L',
    SECRET = 'SEC',
}

export enum CardType {
    CHARACTER = 'CHARACTER',
    LEADER = 'LEADER',
    EVENT = 'EVENT',
    STAGE = 'STAGE',
}

export enum CardColor {
    RED = 'Red',
    GREEN = 'Green',
    BLUE = 'Blue',
    YELLOW = 'Yellow',
    BLACK = 'Black',
    PURPLE = 'Purple',
}

export enum CardAttribute {
    SLASH = 'Slash',
    RANGED = 'Ranged',
    STRIKE = 'Strike',
    SPECIAL = 'Special',
    WISDOM = 'Wisdom',
    NONE = '',
}

export type Card = {
    card_id: string;
    name: string;
    rarity: Rarity;
    type: CardType;
    attribute: CardAttribute[];
    power: number;
    counter: number;
    color: CardColor[];
    card_type: string[];
    effect: string;
    alternate_art: number;
}

export interface CardsQuery {
    card_id?: string;
    name?: string;
    rarity?: Rarity;
    type?: CardType;
    attribute?: CardAttribute[];
    color?: CardColor[];
    card_type?: string[];
}

// DECKS
export type DeckCard = {
    card_id: string
    quantity: number
}

export type Deck = {
    _id: string
    user_id: string
    name: string
    leader: string
    cards: DeckCard[]
}