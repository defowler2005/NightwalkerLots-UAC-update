execute as @s[scores={entityclear=350}] run tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}
execute as @s[scores={entityclear=300}] run tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}
execute as @s[scores={entityclear=250}] run tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}
execute as @s[scores={entityclear=200}] run tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}
execute as @s[scores={entityclear=150}] run tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}
execute as @s[scores={entityclear=100}] run function UAC/packages/autolagclearasset
execute as @s[scores={entityclear=40}] run tag @a remove entclear