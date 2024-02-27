import { Player, world } from "@minecraft/server";


function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScores().find(pT => pT.displayName == target)?.score
        return oB.getScore(target)
    } catch (error) {
        return 0;
    }
};
/*
function scoreTest(target, objective) {
    try {
        return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? oB.getParticipants().find(pT => pT.displayName == target) : target.scoreboard)
    } catch {
        return NaN
    }
}*/
/**
 * 
 * @param {Player} target 
 * @param {String} objective 
 * @param {Number} amount 
 * @param {Number} add 
 * @returns {Number}
 */
function setScore(target, objective, amount, add = false) {
    try {
        const scoreObj = world.scoreboard.getObjective(objective);
        const dummy = scoreObj.getParticipants().find(pT => pT.displayName == target);
        const score = parseInt((add ? target.scoreboard.getScore(scoreObj) : 0) + amount);
        if (typeof target === 'string') return scoreObj.setScore(dummy, amount);
        target.scoreboard.setScore(scoreObj, score)
    } catch { return 0 };
    return score;
};

export { scoreTest, setScore }