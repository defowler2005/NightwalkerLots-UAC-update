#creative with score
execute as @s run titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#creative without score
execute as @s run titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b"}]}
#creative resource mode
execute as @s run titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.9§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}

#Op abuse with score message
execute as @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=1,opamtoggle=1,hometp=3}] run titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#Op abuse without score message
execute as @s[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=1,opamtoggle=1,hometp=3}] run titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands `"}]}
#Op abuse resource mode
execute as @s[tag=staffstatus,m=c,scores={hmmtoggle=3,OPAM=1,opamtoggle=1,hometp=3}] run titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}