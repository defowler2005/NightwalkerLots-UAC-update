scoreboard players add @a welcome 1
##scoreboard players add tpsdummy ontick 1
scoreboard objectives add welcome dummy welcome
execute as @a[scores={welcome=100}] run scoreboard objectives add has_gt dummy
execute as @a[scores={welcome=110..140}] run scoreboard players set @s has_gt 0
execute as @a[scores={welcome=190}] run function UAC/asset/welcome_asset
execute as @a[scores={welcomed=1}] run scoreboard players set @s welcome 0
gamerule functioncommandlimit 9999