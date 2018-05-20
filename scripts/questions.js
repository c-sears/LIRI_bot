// Questions to be used while using the inquirer module

export const startQuest = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'user_choice',
        choices: [
            'Search Twitter',
            'Search Spotify',
            'Search OMDB'
        ]
    }
]


export const twitQuest = [
    {
        type: 'list',
        message: 'Who\'s tweets would you like to see?',
        name: 'twit_handel',
        choices: [
            'Your tweets',
            'His tweets',
            'Search tweets'
        ]
    }
]

export const spotQuest = [
    {
        type: 'list',
        message: 'What would you like to search by?',
        name: 'search_type',
        choices: [
            'artist',
            'album',
            'track'
        ]
    },
    {
        type: 'input',
        message: 'Enter search query',
        name: 'search_param'
    }
]

