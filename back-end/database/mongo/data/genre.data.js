const GENRE = [
    {
        name: "Action",
        description: "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc.).",
        code: 1,
        color: "#FFE4B9",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Action.png",
        nsfw: false
    },
    {
        name: "Adventure",
        description: "An adventure story is about a protagonist who journeys to epic or distant places to accomplish something.",
        code: 2,
        color: "#CAF0FF",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Adventure.png",
        nsfw: false
    },
    {
        name: "Cars",
        description: "Stories that feature cars at the center of attention or involve racing.",
        code: 3,
        color: "#C5C5C5",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Cars.png",
        nsfw: false
    },
    {
        name: "Comedy",
        description: "Comedy is a story that tells about a series of funny, or comical events, intended to make the audience laugh.",
        code: 4,
        color: "#FFEFB5",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Comedy.png",
        nsfw: false
    },
    {
        name: "Dementia",
        description: "Dementia describes stories that have mind-twisting plots.",
        code: 5,
        color: "#CA9BD0",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Dementia.png",
        nsfw: false
    },
    {
        name: "Demons",
        description: "Demons are supernatural and often malevolent being prevalent in religion, occultism, literature, fiction, mythology and folklore.",
        code: 6,
        color: "#99B6D8",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Demons.png",
        nsfw: false
    },
    {
        name: "Drama",
        description: "Drama is a type of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone, focusing on in-depth development of realistic characters who must deal with realistic emotional struggles.",
        code: 8,
        color: "#B7B0FF",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Drama.png",
        nsfw: false
    },
    {
        name: "Ecchi",
        description: "Ecchi is an often used slang term in the Japanese language for playfully sexual actions. As an adjective, it is used with the meaning of \"sexy\", \"dirty\" or \"naughty\".",
        code: 9,
        color: "#FFA0A0",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Ecchi.png",
        nsfw: true
    },
    {
        name: "Fantasy",
        description: "A fantasy story is about magic or supernatural forces, rather than technology (as science fiction) if it happens to take place in a modern or future era.",
        code: 10,
        color: "#CEFF9D",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Fantasy.png",
        nsfw: false
    },
    {
        name: "Game",
        description: "Stories that feature games at the center of attention or involve gaming.",
        code: 11,
        color: "#FF99B7",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Game.png",
        nsfw: false
    },
    {
        name: "Harem",
        description: "Harem is an emphasis on polygamous or love triangle relationships characterized by a protagonist surrounded amorously by three or more members of either the same or opposing gender, sex or love interests.",
        code: 35,
        color: "#FFAEB8",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Harem.png",
        nsfw: true
    },
    {
        name: "Hentai",
        description: "Anime that have pornography at the center of attention.",
        code: 12,
        color: "#ffffff",
        symbol: null,
        nsfw: true
    },
    {
        name: "Historical",
        description: "Stories focused on characters or happenings of the past.",
        code: 13,
        color: "#9A8666",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Historical.png",
        nsfw: false
    },
    {
        name: "Horror",
        description: "A horror story is told to deliberately scare or frighten the audience, through suspense, violence or shock.",
        code: 14,
        color: "#262626",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Horror.png",
        nsfw: false
    },
    {
        name: "Josei",
        description: "Josei are mostly related to women’s universe, tastes, and vision of the world.",
        code: 43,
        color: "#FFB4D2",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Josei.png",
        nsfw: false
    },
    {
        name: "Kids",
        description: "Stories that are generally enjoyed by children.",
        code: 15,
        color: "#FFFABD",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Kids.png",
        nsfw: false
    },
    {
        name: "Magic",
        description: "Stories where abnormal events such as levitation, telekinesis and talking with the dead take place.",
        code: 16,
        color: "#B2A4D3",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Magic.png",
        nsfw: false
    },
    {
        name: "Martial Arts",
        description: "Stories that portray fighting and the practicing of martial arts.",
        code: 17,
        color: "#E6997F",
        symbol: "https://github.com/Kurozora/anime/blob/master/genre-symbols/Martial%20Arts.png",
        nsfw: false
    },
    {
        name: "Mecha",
        description: "Mecha refers to both scientific ideas and science fiction stories that center on giant robots or machines controlled by people.",
        code: 18,
        color: "#E3E3E3",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Mecha.png",
        nsfw: false
    },
    {
        name: "Military",
        description: "Stories that involve militaries or war.",
        code: 38,
        color: "#9A9778",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Military.png",
        nsfw: false
    },
    {
        name: "Music",
        description: "Music is the main theme of the show.",
        code: 19,
        color: "#D2A2FC",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Music.png",
        nsfw: false
    },
    {
        name: "Mystery",
        description: "A type of fiction in which a detective, or other professional, solves a crime or series of crimes.",
        code: 7,
        color: "#8D6E53",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Mystery.png",
        nsfw: false
    },
    {
        name: "Parody",
        description: "An imitation of a particular writer, artist, or genre, exaggerating it deliberately to produce a comic effect.",
        code: 20,
        color: "#CAE4FF",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Parody.png",
        nsfw: false
    },
    {
        name: "Police",
        description: "A story that primarly deals with the police.",
        code: 39,
        color: "#5786CE",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Police.png",
        nsfw: false
    },
    {
        name: "Psychological",
        description: "A story which emphasizes the psychology of its characters and their unstable emotional states",
        code: 40,
        color: "#6E6E6E",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Psychological.png",
        nsfw: false
    },
    {
        name: "Romance",
        description: "Emotion-driven stories that are primarily focused on the relationship between the main characters of the story. Beyond the focus on the relationship, the biggest defining characteristic of the romance genre is that a happy ending is always guaranteed.",
        code: 22,
        color: "#FFB4E5",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Romance.png",
        nsfw: false
    },
    {
        name: "Samurai",
        description: "Shows that depict samurai or swordplay in general.",
        code: 21,
        color: "#C6D5B4",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Samurai.png",
        nsfw: false
    },
    {
        name: "School",
        description: "The main theme of the show takes place at a school or in a school like environment.",
        code: 23,
        color: "#91FAFA",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/School.png",
        nsfw: false
    },
    {
        name: "Sci-Fi",
        description: "Speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.",
        code: 24,
        color: "#978080",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Sci-Fi.png",
        nsfw: false
    },
    {
        name: "Seinen",
        description: "Show that are typically aimed at men from their 20s to 50s.",
        code: 42,
        color: "#809781",
        symbol: "https://raw.githubusercontent.com/Kurozora/anime/master/genre-symbols/Seinen.png",
        nsfw: false
    },
    {
        name: "Shoujo",
        description: "Show that are typically aimed at young girls under the age of fifteen.",
        code: 25,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Shoujo Ai",
        description: "A narrative or visual work featuring a romance or sexual relationship between two or more females, primarily intended for a male audience.",
        code: 26,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Shounen",
        description: "Show that are typically aimed at young boys under the age of fifteen.",
        code: 27,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Shounen Ai",
        description: "A narrative or visual work featuring a romance or sexual relationship between two or more males, primarily intended for a female audience.",
        code: 28,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Slice of Life",
        description: "The slice of life category of story is a story that portrays a \"cut- out\" sequence of events in a character's life. It may or may not contain any plot progress and little character development, and often has no exposition, conflict, or dénouement, with an open ending.",
        code: 36,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Space",
        description: "The main theme of the show is set in space.",
        code: 29,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Sports",
        description: "Sports is the main theme of the show.",
        code: 30,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Super Power",
        description: "Superpower is a popular culture term for an imaginary superhuman ability.",
        code: 31,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Supernatural",
        description: "Supernatural is a genre of speculative fiction that exploits or is centered around supernatural themes, often violating naturalist assumptions of the real world.",
        code: 37,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Thriller",
        description: "Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.",
        code: 41,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Vampire",
        description: "A vampire is a creature from folklore that subsists by feeding on the vital essence (generally in the form of blood) of the living.",
        code: 32,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Yaoi",
        description: "Yaoi, or Boys Love, is a term used for content in Japanese media (anime, manga, and literary works) involving romantic relationships between men, both sexual and non-sexual in nature.",
        code: 33,
        color: "#ffffff",
        symbol: null,
        nsfw: false
    },
    {
        name: "Yuri",
        description: "Yuri, or Girls Love, is a term used for content in Japanese media (anime, manga, and literary works) involving romantic relationships between women, both sexual and non-sexual in nature.",
        code: 34,
        color: "#ffb7c5",
        symbol: null,
        nsfw: false
    },
    {
        name: "Travel",
        description: "The show can be about the history of places (cities, countries, and out of the way haunts), the desirable sights to see in those places, and the cultures, foods, and people of those places.",
        code: null,
        color: "#34bbfa",
        symbol: null,
        nsfw: false
    }
]

module.exports = {
    GENRE
}