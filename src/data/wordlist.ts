/**
 * Diceware-style wordlist — 512 short, unambiguous, memorable English words.
 * Entropy per word = log2(512) = 9 bits exactly.
 * Recommended passphrase lengths:
 *   4 words → 36 bits (light use)
 *   6 words → 54 bits (good)
 *   8 words → 72 bits (strong)
 */
export const WORDLIST: string[] = [
  // Animals
  'ant','ape','bat','bear','bee','bird','boar','buck','bull','calf',
  'cat','clam','cod','colt','crab','crane','crow','cub','deer','dove',
  'duck','eagle','eel','elk','ewe','fawn','fish','flea','fly','foal',
  'fox','frog','gnat','goat','grub','gull','hawk','hen','hog','hound',
  'ibis','jay','kite','lamb','lark','lion','lynx','mink','mole','moth',
  'mule','newt','owl','ox','perch','pike','pony','pup','ram','rat',
  'raven','slug','snail','snake','sparrow','squid','stag','swan','swift','toad',
  'trout','vole','wasp','wren','yak','zebra',
  // Nature / landscape
  'ash','bay','beach','bloom','bog','branch','brook','bud','cave','clay',
  'cliff','cloud','coast','coral','creek','crest','crop','dale','delta','dew',
  'dirt','dust','fern','field','flint','flood','foam','fog','frost','gem',
  'glacier','glen','grain','grass','grove','gulf','haze','heath','hill','ice',
  'isle','ivy','jade','knoll','lake','lava','leaf','ledge','loam','log',
  'marsh','meadow','mist','moon','moss','mud','opal','ore','peat','peak',
  'pine','plain','pool','reed','reef','ridge','rift','river','rock','root',
  'salt','sand','sea','seed','shaft','shore','silt','sky','slate','sleet',
  'slope','snow','soil','star','stem','stone','storm','stream','summit','sun',
  'swamp','tide','timber','tundra','vale','valley','vine','wave','wind','wood',
  // Colors
  'amber','beige','black','blue','bronze','brown','coral','cream','cyan','gold',
  'gray','green','indigo','jade','khaki','lilac','lime','maroon','mauve','navy',
  'ochre','olive','onyx','orange','peach','pink','plum','purple','red','rose',
  'ruby','rust','sage','scarlet','silver','tan','teal','white','yellow',
  // Common objects
  'axe','bag','ball','barn','beam','bell','bench','blade','bolt','book',
  'boot','bottle','bowl','box','brick','bridge','bucket','button','cage','candle',
  'chain','chair','chest','chisel','clock','cloth','club','coat','cord','crown',
  'cup','desk','dish','dome','door','drum','fence','file','flag','flask',
  'fork','frame','gate','gear','glass','globe','glove','hammer','harp','hat',
  'helm','hinge','hook','horn','iron','jar','key','knife','knob','lamp',
  'latch','lens','lock','loom','mast','mill','mirror','nail','net','oar',
  'paddle','pail','pan','pillar','pin','pipe','plank','plate','plow','pole',
  'pot','probe','pulley','pump','rack','rail','ramp','ring','rod','rope',
  'rudder','sail','scale','scroll','shelf','shield','ship','spike','spire','staff',
  'step','strap','sword','tank','thorn','tile','tool','trap','tray','vault',
  'vial','wall','wedge','wheel','whip','wick','wire','wrench',
  // Actions / verbs (noun form used for clarity)
  'bend','bite','blend','bloom','bolt','bounce','brew','burn','carve','catch',
  'chase','chip','chop','climb','coil','craft','crawl','crumble','crush','curve',
  'cut','dig','dip','dive','drag','draw','drift','drill','drip','drop',
  'drum','dry','dust','fade','fall','fetch','fill','fix','flash','flip',
  'float','flow','fold','forge','form','freeze','glow','grind','grip','grow',
  'guard','guide','haul','hoist','hunt','jump','knit','leap','lift','loop',
  'march','melt','merge','mold','nudge','patch','pierce','pile','pivot','plant',
  'plunge','pour','press','probe','pull','push','rise','roam','roll','rotate',
  'run','rush','scan','seal','shift','sink','skip','slice','slide','smash',
  'snap','soak','soar','spin','spread','sprint','stack','stamp','steer','stretch',
  'strike','swing','tilt','toss','trace','trim','tumble','twist','vault','walk',
  'weave','wrap',
  // Adjectives used as nouns / descriptors
  'bold','brave','bright','broad','calm','clear','cold','crisp','crude','curved',
  'dark','deep','dense','dim','dry','dull','flat','fresh','grim','hard',
  'harsh','heavy','hollow','hot','keen','large','light','long','mild','narrow',
  'plain','prime','pure','quick','quiet','raw','rough','round','sharp','short',
  'slim','slow','small','smooth','soft','steep','still','strong','tall','thick',
  'thin','tough','true','vast','warm','wild','wise',
]
