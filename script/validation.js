function isProvided(name, currentClass, division) {
    // currentClass = parseInt(currentClass);
    console.log(name, currentClass, division)
    if (!name) return false;
    if (currentClass == undefined) return false;
    if (!division) return false;
    return true;

}

module.exports = isProvided;