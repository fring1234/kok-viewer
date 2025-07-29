// KoK Viewer Game-like UI Logic (Icon version)

document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('characterList');
    const sceneList = document.getElementById('sceneList');
    const videoPlayer = document.getElementById('videoPlayer');

    let allData = {};
    let characterMap = {};
    let currentCategory = null;

    // Icon mapping for characters and goddesses
    const characterIconMap = {
        '1001_Tekka': 'Videos/Characters/1001_Tekka/TekkaIcon.png',
        '1002_Yinping': 'Videos/Characters/1002_Yinping/YinpingIcon.png',
        '1003_Rangiku': 'Videos/Characters/1003_Rangiku/RangikuIcon.png',
        '1004_Huaxi': 'Videos/Characters/1004_Huaxi/HuaxiIcon.png',
        '1005_Shitou': 'Videos/Characters/1005_Shitou/ShitouIcon.png',
        '1010_Asaka': 'Videos/Characters/1010_Asaka/AsakaIcon.png',
        '1011_Rin': 'Videos/Characters/1011_Rin/RinIcon.png',
        '1012_Ayano': 'Videos/Characters/1012_Ayano/AyanoIcon.png',
        '1013_Mihime': 'Videos/Characters/1013_Mihime/MihimeIcon.png',
        '1014_Otowa': 'Videos/Characters/1014_Otowa/OtowaIcon.png',
        '1019_Katherine': 'Videos/Characters/1019_Katherine/KatherineIcon.png',
        '1020_Olivia': 'Videos/Characters/1020_Olivia/OliviaIcon.png',
        '1021_Reese': 'Videos/Characters/1021_Reese/ReeseIcon.png',
        '1022_Claire': 'Videos/Characters/1022_Claire/ClaireIcon.png',
        '1023_Peggy': 'Videos/Characters/1023_Peggy/PeggyIcon.png',
        '1028_Meghna': 'Videos/Characters/1028_Meghna/MeghnaIcon.png',
        '1029_Genesis': 'Videos/Characters/1029_Genesis/GenesisIcon.png',
        '1030_Larla': 'Videos/Characters/1030_Larla/LarlaIcon.png',
        '1031_Imani': 'Videos/Characters/1031_Imani/ImaniIcon.png',
        '1032_Aamina': 'Videos/Characters/1032_Aamina/AaminaIcon.png',
        '1037_Jihkuang': 'Videos/Characters/1037_Jihkuang/JihkuangIcon.png',
        '1038_Meiyueh': 'Videos/Characters/1038_Meiyueh/MeiyuehIcon.png',
        '1047_Pailin': 'Videos/Characters/1047_Pailin/PailinIcon.png',
        '1048_Chihua': 'Videos/Characters/1048_Chihua/ChihuaIcon.png',
        '1049_Zheyueh': 'Videos/Characters/1049_Zheyueh/ZheyuehIcon.png',
        '1050_Xiangchen': 'Videos/Characters/1050_Xiangchen/XiangchenIcon.png',
        '1051_Tenka': 'Videos/Characters/1051_Tenka/TenkaIcon.png',
        '1052_Chizuru': 'Videos/Characters/1052_Chizuru/ChizuruIcon.png',
        '1053_Edith': 'Videos/Characters/1053_Edith/EdithIcon.png',
        '1054_Jasmine': 'Videos/Characters/1054_Jasmine/JasmineIcon.png',
        '1055_Rebecca': 'Videos/Characters/1055_Rebecca/RebeccaIcon.png',
        '1056_Nidia': 'Videos/Characters/1056_Nidia/NidiaIcon.png',
        '1057_Doreen': 'Videos/Characters/1057_Doreen/DoreenIcon.png',
        '1058_Diana': 'Videos/Characters/1058_Diana/DianaIcon.png',
        '1059_Jill': 'Videos/Characters/1059_Jill/JillIcon.png',
        '1060_Luna': 'Videos/Characters/1060_Luna/LunaIcon.png',
        '1061_Huanli': 'Videos/Characters/1061_Huanli/HuanliIcon.png',
        '1062_Elizabeth': 'Videos/Characters/1062_Elizabeth/ElizabethIcon.png',
        '1063_Eimi': 'Videos/Characters/1063_Eimi/EimiIcon.png',
        '1064_Eimi Succubus': 'Videos/Characters/1064_EimiSuccubus/EimiSuccubusIcon.png',
        '1065_Kia the Rabbit': 'Videos/Characters/1065_Kia the Rabbit/Kia the RabbitIcon.png',
        '1067_Sibyl': 'Videos/Characters/1067_Sibyl/SibylIcon.png',
        '1068_Andromeda': 'Videos/Characters/1068_Andromeda/AndromedaIcon.png',
        '1069_Jennifer': 'Videos/Characters/1069_Jennifer/JenniferIcon.png',
        '1070_Librarian Saint Eimi': 'Videos/Characters/1070_Librarian Saint Eimi/Librarian Saint EimiIcon.png',
        '1072_Kikyo': 'Videos/Characters/1072_Kikyo/KikyoIcon.png',
        '1073_Sorcerer Hibiki': 'Videos/Characters/1073_Sorcerer Hibiki/Sorcerer HibikiIcon.png',
        '1074_Thea': 'Videos/Characters/1074_Thea/TheaIcon.png',
        '1075_Yua': 'Videos/Characters/1075_Yua/YuaIcon.png',
        '1076_Officer Mikami': 'Videos/Characters/1076_Officer Mikami/Officer MikamiIcon.png',
        '1077_Diva Mikami': 'Videos/Characters/1077_Diva Mikami/Diva MikamiIcon.png',
        '1078_Hata and Hibiki': 'Videos/Characters/1078_Hata and Hibiki/Hata and HibikiIcon.png',
        '1079_Seraphina and Rebel': 'Videos/Characters/1079_Seraphina and Rebel/Seraphina and RebelIcon.png',
        '1080_Sword Maiden Hata': 'Videos/Characters/1080_Sword Maiden Hata/Sword Maiden HataIcon.png',
        '1081_Oni Mikami': 'Videos/Characters/1081_Oni Mikami/Oni MikamiIcon.png',
        '1082_Degraded Elf Juno': 'Videos/Characters/1082_Degraded Elf Juno/Degraded Elf JunoIcon.png',
        '1083_Grand Tailor Eimi': 'Videos/Characters/1083_Grand Tailor Eimi/Grand Tailor EimiIcon.png',
        '1084_Eimi and Shasa': 'Videos/Characters/1084_Eimi and Shasa/Eimi and ShasaIcon.png',
        '1085_Lida the Ewe': 'Videos/Characters/1085_Lida the Ewe/Lida the EweIcon.png',
        '1086_Kiriko': 'Videos/Characters/1086_Kiriko/KirikoIcon.png',
        '1087_Lux and Eimi': 'Videos/Characters/1087_Lux and Eimi/Lux and EimiIcon.png',
        '1088_Crystal': 'Videos/Characters/1088_Crystal/CrystalIcon.png',
        '1089_Yafu': 'Videos/Characters/1089_Yafu/YafuIcon.png',
        '1090_Auri': 'Videos/Characters/1090_Auri/AuriIcon.png',
        '1091_Mircea': 'Videos/Characters/1091_Mircea/MirceaIcon.png',
        '1092_Magician Girl Shasa': 'Videos/Characters/1092_Magician Girl Shasa/Magician Girl ShasaIcon.png',
        '1093_Gemonologist Eimi': 'Videos/Characters/1093_Gemonologist Eimi/Gemonologist EimiIcon.png',
        '1094_Moying': 'Videos/Characters/1094_Moying/MoyingIcon.png',
        '1095_Arushi': 'Videos/Characters/1095_Arushi/ArushiIcon.png',
        '1096_Kaoru': 'Videos/Characters/1096_Kaoru/KaoruIcon.png',
        '1097_Homura': 'Videos/Characters/1097_Homura/HomuraIcon.png',
        '1098_Delna': 'Videos/Characters/1098_Delna/DelnaIcon.png',
        '1099_Trivia': 'Videos/Characters/1099_Trivia/TriviaIcon.png',
        '1100_Phoebe': 'Videos/Characters/1100_Phoebe/PhoebeIcon.png',
        '1101_Baiyuan': 'Videos/Characters/1101_Baiyuan/BaiyuanIcon.png',
        '1102_Grace': 'Videos/Characters/1102_Grace/GraceIcon.png',
        '1103_Elaine': 'Videos/Characters/1103_Elaine/ElaineIcon.png',
        '1104_Wutou': 'Videos/Characters/1104_Wutou/WutouIcon.png',
        '1105_Viola': 'Videos/Characters/1105_Viola/ViolaIcon.png',
        '1106_Lilian': 'Videos/Characters/1106_Lilian/LilianIcon.png',
        '1107_Jinxue': 'Videos/Characters/1107_Jinxue/JinxueIcon.png',
        '1108_Odelia': 'Videos/Characters/1108_Odelia/OdeliaIcon.png',
        '1109_Beverly': 'Videos/Characters/1109_Beverly/BeverlyIcon.png',
        '1110_Saki': 'Videos/Characters/1110_Saki/SakiIcon.png',
        '1111_ZhouYu': 'Videos/Characters/1111_ZhouYu/ZhouYuIcon.png',
        '1112_Hana': 'Videos/Characters/1112_Hana/HanaIcon.png',
        '1113_CaoCao': 'Videos/Characters/1113_CaoCao/CaoCaoIcon.png',
        '1114_ZhugeLiang': 'Videos/Characters/1114_ZhugeLiang/ZhugeLiangIcon.png',
    };
    const goddessIconMap = {
        '2001_Nuwa': 'Videos/Goddess/2001_Nuwa/NuwaIcon.png',
        '2002_Zhuyin': 'Videos/Goddess/2002_Zhuyin/ZhuyinIcon.png',
        '2003_Joan of Arc': 'Videos/Goddess/2003_Joan of Arc/Joan of ArcIcon.png',
        '2004_Freyja': 'Videos/Goddess/2004_Freyja/FreyjaIcon.png',
        '2007_Nide': 'Videos/Goddess/2007_Nide/NideIcon.png',
        '2009_Goddess Mikami': 'Videos/Goddess/2009_Goddess Mikami/Goddess MikamiIcon.png',
        '2010_Goddess Eimi': 'Videos/Goddess/2010_Goddess Eimi/Goddess EimiIcon.png',
        '2011_Goddess Yui': 'Videos/Goddess/2011_Goddess Yui/Goddess YuiIcon.png',
        '2012_Destruction Goddess Mikami': 'Videos/Goddess/2012_Destruction Goddess Mikami/Destruction Goddess MikamiIcon.png',
        '2013_Tamahime': 'Videos/Goddess/2013_Tamahime/TamahimeIcon.png',
        '2014_Goddess of Vocality Eimi': 'Videos/Goddess/2014_Goddess of Vocality Eimi/Goddess of Vocality EimiIcon.png',
        '2015_Dolores': 'Videos/Goddess/2015_Dolores/DoloresIcon.png',
        '2016_Phobes': 'Videos/Goddess/2016_Phobes/PhobesIcon.png',
        '2017_Chronos': 'Videos/Goddess/2017_Chronos/ChronosIcon.png',
        '2018_Izanami': 'Videos/Goddess/2018_Izanami/IzanamiIcon.png',
        '2019_YoungMei': 'Videos/Goddess/2019_YoungMei/YoungMeiIcon.png',
        '2020_Hermes': 'Videos/Goddess/2020_Hermes/HermesIcon.png',
        '2021_Demeter': 'Videos/Goddess/2021_Demeter/DemeterIcon.png',
        '2022_Poseidon': 'Videos/Goddess/2022_Poseidon/PoseidonIcon.png'
    };

    const landOfMuIconMap = {
        '4001_Ein': 'Videos/Secretary/4001_Ein/EinIcon.png',
        '4002_Zwei': 'Videos/Secretary/4002_Zwei/ZweiIcon.png',
        '4003_Drei': 'Videos/Secretary/4003_Drei/DreiIcon.png',
        '4004_Vier': 'Videos/Secretary/4004_Vier/VierIcon.png',
        '4005_Epsilon': 'Videos/Secretary/4005_Epsilon/EpsilonIcon.png',
        '4006_Zeta': 'Videos/Secretary/4006_Zeta/ZetaIcon.png',
        '4007_Eta': 'Videos/Secretary/4007_Eta/EtaIcon.png',
        '4008_Theta': 'Videos/Secretary/4008_Theta/ThetaIcon.png',
        '4009_Kappa': 'Videos/Secretary/4009_Kappa/KappaIcon.png',
        '4010_Iota': 'Videos/Secretary/4010_Iota/IotaIcon.png',
        '4011_Lambda': 'Videos/Secretary/4011_Lambda/LambdaIcon.png',
        '4012_Mi': 'Videos/Secretary/4012_Mi/MiIcon.png',
        '4013_Phidin': 'Videos/Secretary/4013_Phidin/PhidinIcon.png',
    };
    
    const guardianSpiritIconMap = {
        '5001_Arthur': 'Videos/Guardian Spirit/5001_Arthur/ArthurIcon.png',
        '5002_Sammu': 'Videos/Guardian Spirit/5002_Sammu/SammuIcon.png',
        '5003_Ushiwaka': 'Videos/Guardian Spirit/5003_Ushiwaka/UshiwakaIcon.png',
        '5004_LuBu': 'Videos/Guardian Spirit/5004_LuBu/LuBuIcon.png',
        '5005_Durga': 'Videos/Guardian Spirit/5005_Durga/DurgaIcon.png',
        '5006_Mosie': 'Videos/Guardian Spirit/5006_Mosie/MosieIcon.png',
        '5007_Nobunaga': 'Videos/Guardian Spirit/5007_Nobunaga/NobunagaIcon.png',
        '5008_Diaochan': 'Videos/Guardian Spirit/5008_Diaochan/DiaochanIcon.png',
        '5009_Zabeida': 'Videos/Guardian Spirit/5009_Zabeida/ZabeidaIcon.png',
        '5010_Alva': 'Videos/Guardian Spirit/5010_Alva/AlvaIcon.png',
        '5011_Minos': 'Videos/Guardian Spirit/5011_Minos/MinosIcon.png',
        '5012_Hokusai': 'Videos/Guardian Spirit/5012_Hokusai/HokusaiIcon.png',
        '5013_Napoleone': 'Videos/Guardian Spirit/5013_Napoleone/NapoleoneIcon.png',
        '5014_SimaYi': 'Videos/Guardian Spirit/5014_SimaYi/SimaYiIcon.png',
        '5015_Murasaki': 'Videos/Guardian Spirit/5015_Murasaki/MurasakiIcon.png',
        '5016_Yuhuan': 'Videos/Guardian Spirit/5016_Yuhuan/YuhuanIcon.png',
        '5017_Atalanta': 'Videos/Guardian Spirit/5017_Atalanta/AtalantaIcon.png',
        '5018_Vlad': 'Videos/Guardian Spirit/5018_Vlad/VladIcon.png',
        '5019_Tomoe Gozen': 'Videos/Guardian Spirit/5019_Tomoe Gozen/Tomoe GozenIcon.png'
    }

    const heavenRealmIconMap = {
        '7001_Angel': 'Videos/Heaven Realm/7001_Angel/AngelIcon.png',
        '7002_Gabriel': 'Videos/Heaven Realm/7002_Gabriel/GabrielIcon.png',
        '7003_Uriel': 'Videos/Heaven Realm/7003_Uriel/UrielIcon.png',
        '7004_Sariel': 'Videos/Heaven Realm/7004_Sariel/SarielIcon.png',
        '7005_Metatron': 'Videos/Heaven Realm/7005_Metatron/MetatronIcon.png',
    }
    const placeholderIcon = 'Videos/placeholder.png'; // Placeholder icon for missing characters
    // Navigation stack to track history
    let navStack = [];

    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            renderCategoryList();
        })
        .catch(err => {
            characterList.innerHTML = '<p style="color:red">Failed to load videos.json</p>';
        });

    function renderCategoryList() {
        navStack = [];
        characterList.innerHTML = '';
        // Hide the title when a section is selected (i.e., not on main menu)
        const kokTitle = document.querySelector('h1');
        if (kokTitle) kokTitle.style.display = '';
        // Show category label if present
        const catLabel = document.getElementById('categoryLabel');
        if (catLabel) catLabel.style.display = '';
        // Render as a vertical list of buttons, not a <ul>
        const catList = document.createElement('div');
        catList.className = 'category-list';
        Object.keys(allData).forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category; // Use the key as the button label (e.g., "Goddesses")
            btn.className = 'category-btn';
            btn.onclick = () => {
                navStack.push(renderCategoryList);
                currentCategory = category;
                characterMap = allData[category];
                renderCharacterIcons();
                sceneList.innerHTML = '';
                videoPlayer.innerHTML = '';
                // Hide the title when a section is selected
                if (kokTitle) kokTitle.style.display = 'none';
            };
            catList.appendChild(btn);
        });
        characterList.appendChild(catList);
    }

    function renderCharacterIcons() {
        // Hide the title and any category header
        const kokTitle = document.querySelector('.kok-title');
        if (kokTitle) kokTitle.style.display = 'none';
        // Remove the category label text (do not render <h2>${currentCategory}</h2>)
        characterList.innerHTML = '';
        // Add Back button if not at root
        if (navStack.length > 0) {
            const backBtn = document.createElement('button');
            backBtn.textContent = 'Back';
            backBtn.className = 'back-btn center-horizontal'; // Center only in character selection
            backBtn.onclick = () => {
                const last = navStack.pop();
                if (last) last();
                sceneList.innerHTML = '';
                videoPlayer.innerHTML = '';
                // Restore title when going back to main menu
                if (navStack.length === 0) {
                    const kokTitle = document.querySelector('h1');
                    if (kokTitle) kokTitle.style.display = '';
                }
                // Remove transparent class from main container
                document.querySelector('.container').classList.remove('container--transparent');
            };
            characterList.appendChild(backBtn);
        }
        const grid = document.createElement('div');
        grid.className = 'icon-grid';
        Object.keys(characterMap).forEach(character => {
            const iconDiv = document.createElement('div');
            // Add shape modifier class based on category
            let shapeClass = '';
            if (currentCategory === 'Heroes') {
                shapeClass = 'character-icon--circle';
            } else if (currentCategory === 'Guardian Spirit') {
                shapeClass = 'character-icon--hex';
            }
            iconDiv.className = 'character-icon' + (shapeClass ? ' ' + shapeClass : '');
            iconDiv.title = character;
            iconDiv.onclick = () => {
                navStack.push(renderCharacterIcons);
                renderCharacterSection(character);
            };
            let iconSrc;
            if (currentCategory === 'Goddesses') {
                iconSrc = goddessIconMap[character] || placeholderIcon;
            } else if (currentCategory === 'Land of Mu') {
                iconSrc = landOfMuIconMap[character] || placeholderIcon;
            } else if (currentCategory === 'Guardian Spirit') {
                iconSrc = guardianSpiritIconMap[character] || placeholderIcon;
            } else if (currentCategory === 'Heaven Realm') {
                iconSrc = heavenRealmIconMap[character] || placeholderIcon;
            } else {
                iconSrc = characterIconMap[character] || placeholderIcon;
            }
            const img = document.createElement('img');
            img.src = iconSrc;
            img.alt = character;
            img.className = 'icon-img';
            const label = document.createElement('div');
            label.className = 'icon-label';
            const characterName = character.includes('_') ? character.split('_').slice(1).join('_') : character;
            label.textContent = characterName;
            
            // Apply responsive font sizing based on character name length
            if (characterName.length > 20) {
                label.setAttribute('data-length', 'extra-long');
            } else if (characterName.length > 16) {
                label.setAttribute('data-length', 'very-long');
            } else if (characterName.length > 12) {
                label.setAttribute('data-length', 'long');
            }
            
            iconDiv.appendChild(img);
            iconDiv.appendChild(label);
            grid.appendChild(iconDiv);
        });
        characterList.appendChild(grid);
        sceneList.innerHTML = '';
        videoPlayer.innerHTML = '';
        sceneList.style.display = 'none';
        videoPlayer.style.display = 'none';
    }

    function renderCharacterSection(character) {
        // Start with no event selected
        let eventNames = Object.keys(characterMap[character]);
        let currentEvent = null;
        let scenes = [];
        let currentSceneIdx = 0;
        let currentMod = null;

        // If called from spinner/event/mod selector, preserve state
        if (renderCharacterSection._state) {
            ({ currentEvent, scenes, currentSceneIdx, currentMod } = renderCharacterSection._state);
        }

        // Helper to get current video path
        function getCurrentVideoPath() {
            const sceneObj = scenes[currentSceneIdx];
            if (!sceneObj) return '';
            const mods = sceneObj.mods || { 'Vanilla': sceneObj };
            const modNames = Object.keys(mods);
            if (!currentMod || !mods[currentMod]) currentMod = modNames[0];
            return mods[currentMod];
        }

        // Main render
        function renderPage() {
            characterList.innerHTML = '';
            // Back button
            const backBtn = document.createElement('button');
            backBtn.textContent = 'Back';
            backBtn.className = 'back-btn fixed-top-left';
            backBtn.onclick = () => {
                renderCharacterSection._state = undefined;
                if (navStack.length > 0) {
                    const last = navStack.pop();
                    if (last) last();
                }
                sceneList.innerHTML = '';
                videoPlayer.innerHTML = '';
                // Remove transparent class from main container
                document.querySelector('.container').classList.remove('container--transparent');
            };
            characterList.appendChild(backBtn);

            // Event selector (middle left) as always-expanded button list
            const eventSelectorDiv = document.createElement('div');
            eventSelectorDiv.className = 'event-selector fixed-middle-left';
            // Add a 'None' button
            const noneBtn = document.createElement('button');
            noneBtn.textContent = 'None';
            noneBtn.className = (currentEvent === null || currentEvent === '') ? 'event-btn selected' : 'event-btn';
            noneBtn.style.display = 'block';
            noneBtn.onclick = () => {
                currentEvent = null;
                scenes = [];
                currentSceneIdx = 0;
                currentMod = null;
                renderCharacterSection._state = { currentEvent, scenes, currentSceneIdx, currentMod };
                renderPage();
            };
            eventSelectorDiv.appendChild(noneBtn);
            eventNames.forEach(eventName => {
                const btn = document.createElement('button');
                btn.textContent = eventName;
                btn.className = currentEvent === eventName ? 'event-btn selected' : 'event-btn';
                btn.style.display = 'block';
                btn.onclick = () => {
                    if (currentEvent === eventName) return; // Prevent re-render if already selected
                    currentEvent = eventName;
                    scenes = characterMap[character][currentEvent];
                    currentSceneIdx = 0;
                    // Always select 'Vanilla' mod if available when switching event
                    let vanillaMod = 'Vanilla';
                    let mods = scenes[0] && scenes[0].mods ? scenes[0].mods : null;
                    currentMod = (mods && mods[vanillaMod]) ? vanillaMod : (mods ? Object.keys(mods)[0] : null);
                    renderCharacterSection._state = { currentEvent, scenes, currentSceneIdx, currentMod };
                    renderPage();
                };
                eventSelectorDiv.appendChild(btn);
            });
            characterList.appendChild(eventSelectorDiv);

            // Mod selector (middle right)
            let modSelector = null;
            let sceneObj = scenes[currentSceneIdx];
            if (sceneObj) {
                const mods = sceneObj && sceneObj.mods ? sceneObj.mods : { 'Vanilla': sceneObj };
                const modNames = Object.keys(mods);
                // Replace dropdown with button list
                const modSelectorDiv = document.createElement('div');
                modSelectorDiv.className = 'mod-selector fixed-middle-right';
                modNames.forEach(modName => {
                    const btn = document.createElement('button');
                    btn.textContent = modName;
                    btn.className = currentMod === modName ? 'event-btn selected' : 'event-btn';
                    btn.style.display = 'block';
                    btn.onclick = () => {
                        if (currentMod === modName) return;
                        currentMod = modName;
                        renderCharacterSection._state = { currentEvent, scenes, currentSceneIdx, currentMod };
                        renderPage();
                    };
                    modSelectorDiv.appendChild(btn);
                });
                characterList.appendChild(modSelectorDiv);
            }

            // Video player (center)
            videoPlayer.style.display = 'flex';
            const videoPath = getCurrentVideoPath();
            videoPlayer.innerHTML = videoPath ? `<video controls autoplay loop width="640" style="display:block; margin:auto;"><source src="${encodeURI(videoPath)}" type="video/mp4"></video>` : '';

            // Spinner (bottom center)
            if (scenes.length > 0) {
                const spinner = document.createElement('div');
                spinner.className = 'scene-spinner fixed-bottom-center';
                const prevBtn = document.createElement('button');
                prevBtn.textContent = '⟨';
                prevBtn.className = 'scene-nav-btn';
                prevBtn.disabled = scenes.length === 1;
                prevBtn.onclick = () => {
                    if (scenes.length > 1) {
                        currentSceneIdx = (currentSceneIdx - 1 + scenes.length) % scenes.length;
                        // Keep mod selection if possible
                        let mods = scenes[currentSceneIdx] && scenes[currentSceneIdx].mods ? scenes[currentSceneIdx].mods : null;
                        if (!mods || !mods[currentMod]) {
                            currentMod = (mods && mods['Vanilla']) ? 'Vanilla' : (mods ? Object.keys(mods)[0] : null);
                        }
                        renderCharacterSection._state = { currentEvent, scenes, currentSceneIdx, currentMod };
                        renderPage();
                    }
                };
                const nextBtn = document.createElement('button');
                nextBtn.textContent = '⟩';
                nextBtn.className = 'scene-nav-btn';
                nextBtn.disabled = scenes.length === 1;
                nextBtn.onclick = () => {
                    if (scenes.length > 1) {
                        currentSceneIdx = (currentSceneIdx + 1) % scenes.length;
                        // Keep mod selection if possible
                        let mods = scenes[currentSceneIdx] && scenes[currentSceneIdx].mods ? scenes[currentSceneIdx].mods : null;
                        if (!mods || !mods[currentMod]) {
                            currentMod = (mods && mods['Vanilla']) ? 'Vanilla' : (mods ? Object.keys(mods)[0] : null);
                        }
                        renderCharacterSection._state = { currentEvent, scenes, currentSceneIdx, currentMod };
                        renderPage();
                    }
                };
                // Custom drop-up menu for scene selection
                const dropupWrapper = document.createElement('div');
                dropupWrapper.className = 'scene-dropup-wrapper';
                const dropupBtn = document.createElement('button');
                dropupBtn.className = 'scene-dropup-btn';
                dropupBtn.textContent = scenes[currentSceneIdx].name;
                dropupWrapper.appendChild(dropupBtn);
                const dropupList = document.createElement('ul');
                dropupList.className = 'scene-dropup-list';
                dropupList.style.display = 'none';
                scenes.forEach((scene, idx) => {
                    const li = document.createElement('li');
                    li.textContent = scene.name;
                    li.onclick = (e) => {
                        e.stopPropagation();
                        currentSceneIdx = idx;
                        // Keep mod selection if possible
                        let mods = scenes[currentSceneIdx] && scenes[currentSceneIdx].mods ? scenes[currentSceneIdx].mods : null;
                        if (!mods || !mods[currentMod]) {
                            currentMod = (mods && mods['Vanilla']) ? 'Vanilla' : (mods ? Object.keys(mods)[0] : null);
                        }
                        renderCharacterSection._state = { currentEvent, scenes, currentSceneIdx, currentMod };
                        renderPage();
                        dropupList.style.display = 'none';
                    };
                    dropupList.appendChild(li);
                });
                dropupWrapper.appendChild(dropupList);
                dropupBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (scenes.length > 1) {
                        dropupList.style.display = dropupList.style.display === 'block' ? 'none' : 'block';
                    }
                };
                // Hide dropup when clicking outside
                document.addEventListener('click', function hideDropup(e) {
                    dropupList.style.display = 'none';
                }, { once: true });
                spinner.appendChild(prevBtn);
                spinner.appendChild(dropupWrapper);
                spinner.appendChild(nextBtn);
                characterList.appendChild(spinner);
            }
        }

        renderCharacterSection._state = undefined;
        renderPage();
        sceneList.innerHTML = '';
        videoPlayer.innerHTML = '';
        sceneList.style.display = 'none';
        videoPlayer.style.display = 'flex';
        // Add transparent class to main container
        document.querySelector('.container').classList.add('container--transparent');
    }

    function playVideo(path) {
        videoPlayer.style.display = 'flex';
        videoPlayer.innerHTML = `<video controls autoplay loop width="640" style="display:block; margin:auto;"><source src="${path}" type="video/mp4"></video>`;
    }
});