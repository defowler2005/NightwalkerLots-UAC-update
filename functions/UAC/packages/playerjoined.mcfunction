# This execute ass on THE PLAYER when every time they join ( Good for setting up combat logging and such )
# If gametest isn't enabled it will use the online player objective from autolagclear package
# This is no longer called from gametest - 3/8/22

execute as @s[scores={in_combat=1,clmtoggle=1}] run function UAC/asset/clog_punish
execute as @s[scores={in_combat=1,clmtoggle=2}] run function UAC/asset/clog_punish
scoreboard players set @s afktimer 0
scoreboard players set @s online 1
tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §d"},{"selector":"@s"},{"text":" §bjoined. §bwarns§7: §7["},{"score":{"name":"@s","objective":"warn"}},{"text":"§b/3§7]"},{"text":" §bGMC flags§7: §7["},{"score":{"name":"@s","objective":"gmc_flag"}},{"text":"§b/4§7]"},{"text":" §bII Flags§7: §7["},{"score":{"name":"@s","objective":"warnillegal"}},{"text":"§b/9§7]"}]}

function UAC/modules/permban

#Remove player from realm
execute as @s[tag=!staffstatus,tag=PermBan] run execute as @s run function UAC/asset/ban_disconnect_message
execute as @s[tag=!staffstatus,tag=Ban] run execute as @s run function UAC/asset/ban_disconnect_message
execute as @s[tag=!staffstatus,tag=illegalitemban] run execute as @s run function UAC/asset/ban_disconnect_message
execute as @s[tag=!staffstatus,tag=BanFly] run execute as @s run function UAC/asset/ban_disconnect_message
execute as @s[tag=!staffstatus,tag=BanPhase] run execute as @s run function UAC/asset/ban_disconnect_message
execute as @s[tag=!staffstatus,scores={warn=3..}] run execute as @s run function UAC/asset/ban_disconnect_message

event entity @s[tag=!staffstatus,scores={BanPhase=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanFly=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={IIB=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={PermBan=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanWarn=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={warn=3..}] uac:ban_soft