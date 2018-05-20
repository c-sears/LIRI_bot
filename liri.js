
import moment from 'moment'
import inquirer from 'inquirer'
import { startQuest } from './scripts/questions'
import { runTwitInt, runSpotInt, runOmdbInt } from './scripts/Functions'


inquirer.prompt(startQuest).then(data=>{
    const user_choice = data.user_choice
    switch(user_choice){
        case 'Search Twitter':
            runTwitInt()
            break
        case 'Search Spotify':
            runSpotInt()
            break
        case 'Search OMDB':
            runOmdbInt()
            break
    }
})
