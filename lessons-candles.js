/* Atlas Crypto — Marchés & trading
 * Chapitre 12 : lire les chandeliers et les volumes.
 * Les séries, prix et volumes affichés sont fictifs et servent uniquement à l'apprentissage.
 */
window.ATLAS_LESSONS = window.ATLAS_LESSONS || {};
Object.assign(window.ATLAS_LESSONS, {
  12: {
    minutes: 28,
    level: 'Débutant · aucun prérequis de trading',
    objectives: [
      'Identifier ouverture, plus haut, plus bas et clôture dans un chandelier.',
      'Distinguer le corps, les mèches et les principales formes de bougies.',
      'Expliquer ce qu’une unité de temps change dans la lecture d’un graphique.',
      'Comprendre comment un volume est calculé et ce qu’il mesure réellement.',
      'Lire ensemble le prix et le volume sans transformer une observation en prédiction.',
      'Reconnaître les informations qu’un chandelier ne permet pas de connaître.'
    ],
    toc: [
      ['m12-demarrer', 'Avant de regarder les bougies'],
      ['m12-anatomie', 'Les quatre prix OHLC'],
      ['m12-lecture', 'Corps, mèches et séquences'],
      ['m12-unites', 'Unités de temps et clôture'],
      ['m12-volume', 'Comprendre les volumes'],
      ['m12-interpreter', 'Prix et volume ensemble'],
      ['m12-laboratoire', 'Deux laboratoires interactifs'],
      ['m12-glossaire', 'Glossaire'],
      ['m12-retenir', 'À retenir'],
      ['m12-quiz', 'Vérifier ses acquis'],
      ['m12-sources', 'Sources']
    ],
    html: [
      '<div class="lesson-objectives" id="m12-demarrer">',
        '<div class="objectives-main">',
          '<span class="lesson-kicker">Avant de commencer · 02 / 10 du parcours marchés</span>',
          '<h2>Un graphique transforme des milliers d’échanges en quelques repères visuels. Apprenons à lire ce résumé sans lui faire dire plus qu’il ne montre.</h2>',
          '<p>Tu as vu au chapitre précédent que le prix se forme lorsque des ordres se rencontrent. Ici, nous allons observer comment les transactions réalisées sont regroupées dans un graphique : d’abord sous forme de chandeliers, puis avec les volumes échangés.</p>',
          '<div class="objective-tags"><span>Débutant</span><span>28 min environ</span><span>6 objectifs</span></div>',
        '</div>',
        '<aside class="objectives-side"><b>À la fin de ce chapitre</b><ol><li>Lire les quatre prix d’une bougie</li><li>Repérer son corps et ses mèches</li><li>Comprendre une unité de temps</li><li>Lire un histogramme de volume</li><li>Éviter les interprétations automatiques</li></ol></aside>',
      '</div>',
      '<div class="lesson-callout lesson-callout-muted"><strong>Code couleur des graphiques</strong><p>Les illustrations de marché utilisent ici les conventions courantes : vert pour une clôture au-dessus de l’ouverture, rouge pour une clôture en dessous. Ces couleurs sont configurables selon les plateformes. Les mots « haussière » et « baissière », les valeurs et les formes restent donc présents pour que la lecture ne dépende jamais de la couleur seule.</p></div>',

      '<section class="lesson-section" id="m12-anatomie">',
        '<span class="lesson-kicker">01 · Lire une bougie</span>',
        '<h2>Un chandelier contient quatre prix : OHLC</h2>',
        '<p>Un chandelier japonais — souvent appelé <strong>bougie</strong> dans le langage courant — résume les échanges observés pendant une période. Il ne raconte pas chaque transaction : il conserve quatre valeurs, connues sous le nom <strong>OHLC</strong>, pour <em>Open, High, Low, Close</em>.</p>',
        '<div class="m12-chart-card m12-anatomy-card">',
          '<div class="m12-chart-heading"><span>ANATOMIE D’UN CHANDELIER</span><b>Les quatre repères à identifier</b></div>',
          '<svg class="m12-anatomy-svg" viewBox="0 0 760 350" role="img" aria-labelledby="m12-anatomy-title m12-anatomy-desc">',
            '<title id="m12-anatomy-title">Anatomie de deux chandeliers, haussier et baissier</title>',
            '<desc id="m12-anatomy-desc">Le chandelier haussier vert clôture plus haut que son ouverture. Le chandelier baissier rouge clôture plus bas que son ouverture. Les mèches marquent le plus haut et le plus bas de la période.</desc>',
            '<g stroke="#344354" stroke-width="1" opacity=".75"><path d="M45 55H715M45 125H715M45 195H715M45 265H715"/></g>',
            '<g fill="#cbd5e1" font-size="13" font-family="Arial,sans-serif"><text x="55" y="35">PRIX LE PLUS ÉLEVÉ</text><text x="55" y="325">PRIX LE PLUS BAS</text></g>',
            '<g stroke="#22c55e" stroke-width="5" stroke-linecap="round"><path d="M250 55V295"/></g>',
            '<rect x="217" y="125" width="66" height="100" rx="2" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>',
            '<g stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="5 5" opacity=".9"><path d="M283 55H425M283 125H425M283 225H425M283 295H425"/></g>',
            '<g fill="#f8fafc" font-size="14" font-family="Arial,sans-serif"><text x="435" y="60">Plus haut</text><text x="435" y="130">Clôture</text><text x="435" y="230">Ouverture</text><text x="435" y="300">Plus bas</text></g>',
            '<g stroke="#ef4444" stroke-width="5" stroke-linecap="round"><path d="M610 55V295"/></g>',
            '<rect x="577" y="125" width="66" height="100" rx="2" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>',
            '<g fill="#f8fafc" font-size="13" font-family="Arial,sans-serif"><text x="610" y="20" text-anchor="middle">BAISSIÈRE</text><text x="250" y="20" text-anchor="middle">HAUSSIÈRE</text></g>',
            '<g fill="#86efac" font-size="12" font-family="Arial,sans-serif"><text x="250" y="245" text-anchor="middle">Open</text><text x="250" y="115" text-anchor="middle">Close</text></g>',
            '<g fill="#fca5a5" font-size="12" font-family="Arial,sans-serif"><text x="610" y="115" text-anchor="middle">Open</text><text x="610" y="245" text-anchor="middle">Close</text></g>',
          '</svg>',
          '<div class="m12-chart-legend"><span><i class="m12-dot m12-green"></i> Bougie haussière : clôture supérieure à l’ouverture</span><span><i class="m12-dot m12-red"></i> Bougie baissière : clôture inférieure à l’ouverture</span></div>',
          '<p class="m12-chart-note">Schéma simplifié, non coté. Les deux exemples utilisent volontairement une amplitude identique pour rendre visible la différence entre ouverture et clôture.</p>',
        '</div>',
        '<div class="m12-definition-grid">',
          '<article><span>O · OPEN</span><b>Ouverture</b><p>Premier prix retenu pour la période selon les données du graphique.</p></article>',
          '<article><span>H · HIGH</span><b>Plus haut</b><p>Prix le plus élevé enregistré pendant la période.</p></article>',
          '<article><span>L · LOW</span><b>Plus bas</b><p>Prix le plus faible enregistré pendant la période.</p></article>',
          '<article><span>C · CLOSE</span><b>Clôture</b><p>Dernier prix retenu à la fin de la période.</p></article>',
        '</div>',
        '<p>Le corps du chandelier relie l’ouverture à la clôture. La mèche supérieure s’étend jusqu’au plus haut ; la mèche inférieure descend jusqu’au plus bas. Lorsque la clôture est au-dessus de l’ouverture, la bougie est dite haussière. Lorsqu’elle est en dessous, elle est dite baissière.</p>',
        '<div class="lesson-callout"><strong>Le réflexe à mémoriser</strong><p>Le haut du corps n’est pas toujours la clôture : cela dépend du sens de la bougie. En revanche, le sommet de la mèche supérieure est toujours le plus haut et l’extrémité de la mèche inférieure est toujours le plus bas de la période représentée.</p></div>',
      '</section>',

      '<section class="lesson-section" id="m12-lecture">',
        '<span class="lesson-kicker">02 · Interpréter la forme</span>',
        '<h2>Le corps et les mèches : ce qu’ils racontent, et ce qu’ils ne racontent pas</h2>',
        '<p>La longueur du corps représente l’écart entre ouverture et clôture. Un corps long indique un déplacement net plus important pendant la période qu’un corps court. Les mèches montrent que le prix a aussi visité des niveaux situés en dehors du corps, avant de revenir vers une autre zone.</p>',
        '<div class="m12-shape-grid">',
          '<article><div class="m12-shape-icon"><svg viewBox="0 0 90 112" role="img" aria-label="Corps long vert avec petites mèches"><path d="M45 8V104" stroke="#16a34a" stroke-width="4"/><rect x="28" y="28" width="34" height="60" fill="#22c55e"/></svg></div><b>Corps long</b><p>L’ouverture et la clôture sont éloignées. Le déplacement net de la période est important relativement aux autres bougies visibles.</p></article>',
          '<article><div class="m12-shape-icon"><svg viewBox="0 0 90 112" role="img" aria-label="Corps court avec mèche haute et basse longues"><path d="M45 7V105" stroke="#64748b" stroke-width="4"/><rect x="28" y="48" width="34" height="18" fill="#22c55e"/></svg></div><b>Corps court</b><p>Ouverture et clôture sont proches. Le marché a peu changé entre le début et la fin de la période, même si le prix a pu varier entre-temps.</p></article>',
          '<article><div class="m12-shape-icon"><svg viewBox="0 0 90 112" role="img" aria-label="Longue mèche supérieure rouge"><path d="M45 7V105" stroke="#ef4444" stroke-width="4"/><rect x="28" y="65" width="34" height="24" fill="#ef4444"/></svg></div><b>Mèche supérieure longue</b><p>Le prix a atteint un niveau plus haut que la zone où il a finalement ouvert ou clôturé. Cela ne prouve pas, à lui seul, un retournement.</p></article>',
          '<article><div class="m12-shape-icon"><svg viewBox="0 0 90 112" role="img" aria-label="Longue mèche inférieure verte"><path d="M45 7V105" stroke="#16a34a" stroke-width="4"/><rect x="28" y="20" width="34" height="24" fill="#22c55e"/></svg></div><b>Mèche inférieure longue</b><p>Le prix a atteint un niveau plus bas puis a terminé la période au-dessus de ce point. Le contexte reste indispensable pour interpréter ce mouvement.</p></article>',
        '</div>',
        '<h3>Et si ouverture et clôture sont presque identiques ?</h3>',
        '<p>On parle souvent de <strong>doji</strong> lorsque l’ouverture et la clôture sont identiques ou très proches au regard de l’échelle du graphique. Le corps devient alors très petit, parfois presque une ligne. Cela indique que le déplacement net entre début et fin est faible ; cela ne signifie pas automatiquement qu’un retournement va suivre.</p>',
        '<div class="m12-caution-grid"><div><b>Ce que la bougie permet de voir</b><ul><li>Les quatre prix OHLC de la période.</li><li>Le déplacement net entre ouverture et clôture.</li><li>L’amplitude entre le plus haut et le plus bas.</li></ul></div><div><b>Ce qu’elle ne permet pas de voir seule</b><ul><li>L’ordre exact dans lequel le plus haut et le plus bas ont été atteints.</li><li>Chaque transaction réalisée à l’intérieur de la période.</li><li>La cause du mouvement ou la direction future du marché.</li></ul></div></div>',
      '</section>',

      '<section class="lesson-section" id="m12-unites">',
        '<span class="lesson-kicker">03 · La dimension du temps</span>',
        '<h2>Une bougie représente une période, pas un nombre fixe de mouvements</h2>',
        '<p>L’unité de temps — ou <strong>timeframe</strong> — indique la durée couverte par chaque chandelier dans un graphique temporel. Sur un graphique en 5 minutes, chaque bougie regroupe les transactions réalisées pendant un intervalle de cinq minutes. Sur un graphique horaire, une bougie résume une heure.</p>',
        '<div class="m12-timeframe-grid">',
          '<article><span>1 min</span><b>Très court terme</b><p>Chaque bougie résume une minute de données.</p></article>',
          '<article><span>5 min</span><b>Intraday</b><p>Chaque bougie regroupe cinq minutes.</p></article>',
          '<article><span>1 h</span><b>Horaire</b><p>Chaque bougie regroupe une heure.</p></article>',
          '<article><span>1 j</span><b>Journalier</b><p>Chaque bougie couvre une journée selon le fuseau et la coupure du fournisseur.</p></article>',
        '</div>',
        '<p>Les valeurs OHLC sont recalculées à partir des échanges compris dans l’intervalle. L’ouverture est le premier prix retenu, le plus haut et le plus bas sont les extrêmes observés, et la clôture est le dernier prix retenu à la fin de l’intervalle. Le volume associé correspond à l’activité agrégée pendant cette même période.</p>',
        '<div class="m12-chart-card m12-time-comparison">',
          '<div class="m12-chart-heading"><span>LA MÊME SÉQUENCE, DEUX ÉCHELLES</span><b>Le regroupement change la forme du graphique</b></div>',
          '<svg viewBox="0 0 760 260" role="img" aria-labelledby="m12-time-title m12-time-desc">',
            '<title id="m12-time-title">Comparaison de chandeliers sur des unités de temps différentes</title>',
            '<desc id="m12-time-desc">En haut, plusieurs petites bougies représentent des intervalles courts. En bas, une seule bougie résume l’ensemble de la séquence sur un intervalle plus long.</desc>',
            '<g stroke="#344354" stroke-width="1"><path d="M40 95H720M40 205H720"/></g>',
            '<g stroke-width="4" stroke-linecap="round"><path d="M120 30V95" stroke="#22c55e"/><path d="M220 15V75" stroke="#22c55e"/><path d="M320 25V105" stroke="#ef4444"/><path d="M420 60V120" stroke="#22c55e"/><path d="M520 35V110" stroke="#22c55e"/><path d="M620 25V95" stroke="#ef4444"/></g>',
            '<g><rect x="104" y="55" width="32" height="26" fill="#22c55e"/><rect x="204" y="35" width="32" height="28" fill="#22c55e"/><rect x="304" y="48" width="32" height="42" fill="#ef4444"/><rect x="404" y="86" width="32" height="24" fill="#22c55e"/><rect x="504" y="60" width="32" height="35" fill="#22c55e"/><rect x="604" y="48" width="32" height="28" fill="#ef4444"/></g>',
            '<g fill="#cbd5e1" font-size="13" font-family="Arial,sans-serif"><text x="42" y="16">INTERVALLES COURTS</text><text x="42" y="150">INTERVALLE REGROUPÉ</text></g>',
            '<path d="M80 130V215" stroke="#94a3b8" stroke-dasharray="4 5"/><path d="M680 130V215" stroke="#94a3b8" stroke-dasharray="4 5"/>',
            '<path d="M380 158V245" stroke="#22c55e" stroke-width="5"/><rect x="350" y="176" width="60" height="42" fill="#22c55e"/>',
            '<g fill="#f8fafc" font-size="12" font-family="Arial,sans-serif"><text x="440" y="187">Une seule bougie</text><text x="440" y="205">regroupe le début,</text><text x="440" y="223">la fin et les deux extrêmes.</text></g>',
          '</svg>',
          '<p class="m12-chart-note">Illustration de principe : la bougie longue conserve les extrêmes et les deux bornes de l’intervalle, mais efface les étapes intermédiaires.</p>',
        '</div>',
        '<h3>Une bougie en formation n’est pas encore clôturée</h3>',
        '<p>Avant la fin de son intervalle, le plus haut, le plus bas, la clôture provisoire et le volume peuvent encore changer. Une bougie verte à 14 h 42 sur un graphique de 15 minutes peut devenir rouge avant sa clôture à 14 h 45. Une lecture faite avant la clôture doit donc être considérée comme provisoire.</p>',
        '<div class="lesson-callout lesson-callout-muted"><strong>Attention aux fuseaux horaires</strong><p>Sur un marché crypto ouvert en continu, la frontière d’une bougie journalière dépend du fuseau horaire et de la convention de la plateforme ou du fournisseur. Deux graphiques construits à partir des mêmes transactions, mais avec des coupures différentes, peuvent présenter des bougies journalières différentes.</p></div>',
        '<p>Enfin, toutes les représentations ne sont pas temporelles : certains graphiques créent une nouvelle barre après un nombre de transactions, de ticks ou de variations de prix. Nous nous concentrons ici sur les chandeliers temporels classiques ; les représentations non temporelles seront abordées plus tard.</p>',
      '</section>',

      '<section class="lesson-section" id="m12-volume">',
        '<span class="lesson-kicker">04 · Mesurer l’activité</span>',
        '<h2>Le volume : combien a été échangé pendant la période ?</h2>',
        '<p>Le <strong>volume échangé</strong> mesure la quantité ou la valeur des échanges réalisés pendant une période donnée — pas simplement le nombre de transactions. L’unité retenue dépend du marché et du fournisseur de données. Dans un graphique, il est souvent affiché sous les chandeliers sous la forme d’un histogramme : chaque barre correspond au volume de la période de la bougie située juste au-dessus.</p>',
        '<div class="m12-chart-card">',
          '<div class="m12-chart-heading"><span>EXEMPLE FICTIF · BTC/USDT</span><b>Chandeliers et histogramme de volume</b></div>',
          '<svg class="m12-price-volume-svg" viewBox="0 0 780 390" role="img" aria-labelledby="m12-pv-title m12-pv-desc">',
            '<title id="m12-pv-title">Graphique fictif avec chandeliers et volumes</title>',
            '<desc id="m12-pv-desc">Huit chandeliers alternent entre clôtures haussières et baissières. Sous le prix, huit barres de volume correspondent aux mêmes intervalles. Une barre importante apparaît sous une période d’activité élevée.</desc>',
            '<defs><pattern id="m12-price-grid" width="88" height="38" patternUnits="userSpaceOnUse"><path d="M88 0H0V38" fill="none" stroke="#526174" stroke-width="1" opacity=".32"/></pattern></defs>',
            '<rect x="54" y="24" width="680" height="215" fill="url(#m12-price-grid)"/>',
            '<rect x="54" y="260" width="680" height="82" fill="#121d2a"/>',
            '<g stroke="#64748b" stroke-width="1"><path d="M54 24V342M54 239H734M54 260H734M54 342H734"/></g>',
            '<g fill="#aab8c8" font-size="12" font-family="Arial,sans-serif"><text x="8" y="30">Prix</text><text x="8" y="275">Volume</text><text x="73" y="365">1</text><text x="155" y="365">2</text><text x="237" y="365">3</text><text x="319" y="365">4</text><text x="401" y="365">5</text><text x="483" y="365">6</text><text x="565" y="365">7</text><text x="647" y="365">8</text></g>',
            '<g stroke-width="4" stroke-linecap="round"><path d="M100 117V160" stroke="#22c55e"/><path d="M182 103V138" stroke="#22c55e"/><path d="M264 96V153" stroke="#ef4444"/><path d="M346 132V175" stroke="#22c55e"/><path d="M428 74V146" stroke="#22c55e"/><path d="M510 81V132" stroke="#ef4444"/><path d="M592 110V167" stroke="#ef4444"/><path d="M674 124V175" stroke="#22c55e"/></g>',
            '<g><rect x="88" y="124" width="24" height="22" fill="#22c55e"/><rect x="170" y="110" width="24" height="14" fill="#22c55e"/><rect x="252" y="110" width="24" height="36" fill="#ef4444"/><rect x="334" y="139" width="24" height="7" fill="#22c55e"/><rect x="416" y="88" width="24" height="51" fill="#22c55e"/><rect x="498" y="88" width="24" height="29" fill="#ef4444"/><rect x="580" y="117" width="24" height="43" fill="#ef4444"/><rect x="662" y="132" width="24" height="28" fill="#22c55e"/></g>',
            '<g opacity=".88"><rect x="88" y="314" width="24" height="28" fill="#22c55e"/><rect x="170" y="301" width="24" height="41" fill="#22c55e"/><rect x="252" y="292" width="24" height="50" fill="#ef4444"/><rect x="334" y="319" width="24" height="23" fill="#22c55e"/><rect x="416" y="270" width="24" height="72" fill="#22c55e"/><rect x="498" y="286" width="24" height="56" fill="#ef4444"/><rect x="580" y="279" width="24" height="63" fill="#ef4444"/><rect x="662" y="305" width="24" height="37" fill="#22c55e"/></g>',
            '<path d="M54 251H734" stroke="#64748b" stroke-width="1" stroke-dasharray="3 4"/>',
          '</svg>',
          '<div class="m12-chart-legend"><span><i class="m12-dot m12-green"></i> Période où la clôture est supérieure à l’ouverture</span><span><i class="m12-dot m12-red"></i> Période où la clôture est inférieure à l’ouverture</span></div>',
          '<p class="m12-chart-note">La hauteur des barres représente ici un volume fictif. La couleur de chaque barre reprend seulement le sens de la bougie ; elle ne représente pas une mesure directe des acheteurs contre les vendeurs.</p>',
        '</div>',
        '<h3>Dans quelle unité le volume est-il exprimé ?</h3>',
        '<p>Il faut regarder le marché et la méthode du fournisseur. Sur une paire spot BTC/USDT, le volume peut être exprimé en BTC (unités de base) ou en USDT (valeur de cotation). Sur un marché de contrats dérivés, il peut être compté en contrats ou converti en valeur notionnelle. Les plateformes et les agrégateurs n’affichent pas toujours la même unité ni le même périmètre.</p>',
        '<div class="m12-volume-units"><article><b>Quantité de base</b><strong>12,4 BTC</strong><p>Somme des bitcoins échangés pendant l’intervalle, selon la convention de la source.</p></article><article><b>Valeur de cotation</b><strong>824 000 USDT</strong><p>Valeur des transactions exprimée dans l’actif de cotation. Exemple illustratif.</p></article><article><b>Contrats / notionnel</b><strong>1 250 contrats</strong><p>Sur les dérivés, la taille et la valeur de chaque contrat dépendent des spécifications du produit.</p></article></div>',
        '<div class="lesson-callout"><strong>Volume et liquidité ne sont pas synonymes</strong><p>Le volume décrit des transactions déjà exécutées pendant une période. La profondeur du carnet décrit des ordres visibles en attente à un instant donné. Un marché a pu beaucoup échanger hier sans présenter aujourd’hui une grande quantité disponible près du meilleur prix. C’est le lien direct avec le chapitre 11.</p></div>',
        '<p>Un volume très élevé ne signifie pas non plus qu’il y a plus d’acheteurs que de vendeurs : chaque transaction exécutée a nécessairement une contrepartie. Pour distinguer le côté qui a initié l’échange, il faut des données supplémentaires et une méthode de classification spécifique. Un simple histogramme de volume n’apporte pas cette information.</p>',
      '</section>',

      '<section class="lesson-section" id="m12-interpreter">',
        '<span class="lesson-kicker">05 · Combiner les informations</span>',
        '<h2>Lire prix et volume ensemble : observer avant de conclure</h2>',
        '<p>Le volume donne du contexte au mouvement du prix. Une activité plus forte peut accompagner une hausse ou une baisse ; une activité plus faible peut accompagner un déplacement limité. Mais la relation n’est pas une règle mécanique : le volume seul ne révèle ni la cause du mouvement ni sa suite.</p>',
        '<div class="m12-reading-table">',
          '<div class="m12-reading-row m12-reading-head"><b>Observation</b><b>Ce que tu peux dire</b><b>Ce que tu ne peux pas conclure</b></div>',
          '<div class="m12-reading-row"><b><span class="m12-word-up">Prix en hausse</span><br>Volume en hausse</b><p>Un volume plus élevé a été échangé pendant une période où le prix a terminé au-dessus de son ouverture.</p><p>Ce n’est pas une garantie que la hausse va continuer ni une mesure directe du nombre net d’acheteurs.</p></div>',
          '<div class="m12-reading-row"><b><span class="m12-word-up">Prix en hausse</span><br>Volume en baisse</b><p>Le prix progresse avec moins d’activité échangée que dans les périodes comparées.</p><p>Ce n’est pas une preuve que le mouvement est faux ou qu’un retournement est imminent.</p></div>',
          '<div class="m12-reading-row"><b><span class="m12-word-down">Prix en baisse</span><br>Volume en hausse</b><p>Le prix termine plus bas alors qu’un volume plus élevé a été enregistré.</p><p>Ce n’est pas une certitude de capitulation, de distribution ou de nouvelle baisse.</p></div>',
          '<div class="m12-reading-row"><b><span class="m12-word-down">Prix en baisse</span><br>Volume en baisse</b><p>Le prix recule avec une activité échangée plus faible que dans les périodes comparées.</p><p>Ce n’est pas une preuve que les vendeurs sont épuisés ni que le prix va rebondir.</p></div>',
        '</div>',
        '<p>La comparaison doit porter sur des périodes comparables, sur la même source de données et sur le même type de marché. Un volume de 1 000 BTC sur une journée ne se compare pas directement à 1 000 contrats sur un perpétuel, ni à un volume agrégé de plusieurs plateformes.</p>',
        '<div class="lesson-callout lesson-callout-muted"><strong>Un graphique n’est pas une boule de cristal</strong><p>Les chandeliers décrivent des prix passés ou en cours ; les volumes résument l’activité réalisée. Ils aident à structurer une observation, mais ne garantissent aucun scénario futur et ne constituent pas, isolément, une stratégie.</p></div>',
      '</section>',

      '<section class="lesson-section" id="m12-laboratoire">',
        '<span class="lesson-kicker">06 · Manipuler pour comprendre</span>',
        '<h2>Laboratoire 1 : construis ton propre chandelier</h2>',
        '<p>Modifie les quatre valeurs OHLC ci-dessous. Le dessin se met à jour automatiquement. Respecte la contrainte logique : le plus haut doit être au moins égal à l’ouverture et à la clôture ; le plus bas doit être inférieur ou égal aux deux.</p>',
        '<div class="m12-lab-card">',
          '<div class="m12-lab-heading"><div><span>SIMULATION PÉDAGOGIQUE</span><h3>Le générateur OHLC</h3></div><span class="m12-sim-badge">Valeurs fictives</span></div>',
          '<div class="m12-builder-layout">',
            '<div class="m12-builder-inputs">',
              '<label for="m12-open">Ouverture (Open)<input id="m12-open" type="number" min="1" max="1000000" step="0.1" value="100"></label>',
              '<label for="m12-high">Plus haut (High)<input id="m12-high" type="number" min="1" max="1000000" step="0.1" value="112"></label>',
              '<label for="m12-low">Plus bas (Low)<input id="m12-low" type="number" min="1" max="1000000" step="0.1" value="96"></label>',
              '<label for="m12-close">Clôture (Close)<input id="m12-close" type="number" min="1" max="1000000" step="0.1" value="108"></label>',
              '<button type="button" class="quiz-reset" id="m12-builder-reset">Réinitialiser les valeurs</button>',
            '</div>',
            '<div class="m12-builder-visual">',
              '<svg id="m12-builder-svg" viewBox="0 0 420 300" role="img" aria-label="Chandelier mis à jour selon les valeurs saisies">',
                '<g stroke="#334155" stroke-width="1"><path d="M28 55H390M28 105H390M28 155H390M28 205H390M28 255H390"/></g>',
                '<g fill="#94a3b8" font-size="11" font-family="Arial,sans-serif"><text x="30" y="45">Niveau de prix</text><text x="30" y="285">Période</text></g>',
                '<line id="m12-builder-wick" x1="180" x2="180" y1="95" y2="175" stroke="#22c55e" stroke-width="5" stroke-linecap="round"/>',
                '<rect id="m12-builder-body" x="150" y="115" width="60" height="40" rx="2" fill="#22c55e"/>',
                '<path id="m12-builder-open-line" d="M210 155H340" stroke="#86efac" stroke-dasharray="5 4" stroke-width="1.5"/>',
                '<path id="m12-builder-close-line" d="M210 115H340" stroke="#86efac" stroke-dasharray="5 4" stroke-width="1.5"/>',
                '<g fill="#f8fafc" font-size="12" font-family="Arial,sans-serif"><text id="m12-builder-high-label" x="225" y="88">H 112</text><text id="m12-builder-low-label" x="225" y="190">L 96</text><text id="m12-builder-open-label" x="345" y="159">O 100</text><text id="m12-builder-close-label" x="345" y="119">C 108</text></g>',
              '</svg>',
              '<div id="m12-builder-feedback" class="m12-lab-feedback" role="status" aria-live="polite">Bougie haussière : la clôture est supérieure à l’ouverture. Les mèches indiquent les extrêmes atteints pendant la période.</div>',
            '</div>',
          '</div>',
        '</div>',
        '<h2>Laboratoire 2 : deux parcours, un seul chandelier</h2>',
        '<p>Imagine deux séances avec les mêmes valeurs : ouverture à 100, plus haut à 110, plus bas à 95 et clôture à 105. Dans le premier scénario, le prix baisse d’abord puis monte. Dans le second, il monte d’abord puis baisse. Les deux produisent pourtant le même OHLC.</p>',
        '<div class="m12-lab-card">',
          '<div class="m12-lab-heading"><div><span>EXPÉRIENCE VISUELLE</span><h3>Quel chemin le prix a-t-il suivi ?</h3></div><span class="m12-sim-badge">Même OHLC</span></div>',
          '<div class="m12-path-controls" role="group" aria-label="Choisir une trajectoire fictive"><button type="button" data-m12-path="a" aria-pressed="true">Parcours A</button><button type="button" data-m12-path="b" aria-pressed="false">Parcours B</button></div>',
          '<svg class="m12-path-svg" viewBox="0 0 560 245" role="img" aria-labelledby="m12-path-title m12-path-desc">',
            '<title id="m12-path-title">Deux trajectoires possibles au sein d’une même bougie</title>',
            '<desc id="m12-path-desc">Le tracé change selon le parcours choisi. Les deux parcours commencent à 100, atteignent 95 et 110, et terminent à 105.</desc>',
            '<g stroke="#334155" stroke-width="1"><path d="M40 40H525M40 95H525M40 150H525M40 205H525"/></g>',
            '<g fill="#94a3b8" font-size="11" font-family="Arial,sans-serif"><text x="5" y="44">110</text><text x="5" y="99">105</text><text x="5" y="154">100</text><text x="5" y="209">95</text><text x="40" y="230">Début</text><text x="525" y="230" text-anchor="end">Fin</text></g>',
            '<polyline id="m12-path-line" points="55,150 165,205 275,95 385,40 505,95" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>',
            '<g fill="#f8fafc" stroke="#38bdf8" stroke-width="2"><circle cx="55" cy="150" r="5"/><circle cx="505" cy="95" r="5"/></g>',
          '</svg>',
          '<div id="m12-path-feedback" class="m12-lab-feedback" role="status" aria-live="polite">Parcours A : le prix atteint d’abord le plus bas, puis le plus haut, avant de clôturer à 105.</div>',
        '</div>',
        '<p class="m12-lab-conclusion">Conclusion : le chandelier conserve quatre repères, pas la chronologie complète des échanges. Pour voir le chemin détaillé, il faut descendre vers des unités plus courtes ou consulter des données de transactions plus fines — lorsqu’elles sont disponibles.</p>',
        '<h3>Mini-expérience : quelle information le volume apporte-t-il ?</h3>',
        '<p>Choisis une situation. Le retour explique ce que le graphique permet d’observer sans lui attribuer un pouvoir prédictif.</p>',
        '<div class="m12-scenario-lab">',
          '<div class="m12-scenario-buttons" role="group" aria-label="Choisir une combinaison de prix et de volume"><button type="button" data-m12-scenario="up-high" aria-pressed="true">Prix ↑ · volume ↑</button><button type="button" data-m12-scenario="up-low" aria-pressed="false">Prix ↑ · volume ↓</button><button type="button" data-m12-scenario="down-high" aria-pressed="false">Prix ↓ · volume ↑</button><button type="button" data-m12-scenario="down-low" aria-pressed="false">Prix ↓ · volume ↓</button></div>',
          '<div id="m12-scenario-feedback" class="m12-lab-feedback" role="status" aria-live="polite">Le prix termine au-dessus de son ouverture et le volume est supérieur aux périodes comparées : davantage de volume a été échangé pendant cette hausse qu’au cours des périodes comparées. Cela ne garantit pas que le mouvement va continuer.</div>',
        '</div>',
      '</section>',

      '<section class="lesson-section" id="m12-glossaire">',
        '<span class="lesson-kicker">07 · Les mots à connaître</span>',
        '<h2>Glossaire du chapitre.</h2>',
        '<p>Les définitions ci-dessous sont accessibles directement dans le texte lors de leur première occurrence. Garde surtout en tête la différence entre les données de prix et la mesure d’activité.</p>',
        '<div class="market-glossary">',
          '<details><summary>Chandelier japonais</summary><p>Représentation graphique d’une période au moyen de quatre prix : ouverture, plus haut, plus bas et clôture. Le corps montre l’écart entre ouverture et clôture ; les mèches montrent les extrêmes.</p></details>',
          '<details><summary>OHLC</summary><p>Abréviation de Open, High, Low, Close : ouverture, plus haut, plus bas et clôture. Ces quatre valeurs résument les prix retenus sur une période donnée.</p></details>',
          '<details><summary>Ouverture (Open)</summary><p>Premier prix retenu dans l’intervalle représenté par le chandelier, selon la méthode du fournisseur de données.</p></details>',
          '<details><summary>Plus haut (High)</summary><p>Prix le plus élevé enregistré pendant l’intervalle représenté.</p></details>',
          '<details><summary>Plus bas (Low)</summary><p>Prix le plus faible enregistré pendant l’intervalle représenté.</p></details>',
          '<details><summary>Clôture (Close)</summary><p>Dernier prix retenu à la fin de l’intervalle. Tant que la bougie n’est pas clôturée, cette valeur reste provisoire.</p></details>',
          '<details><summary>Corps du chandelier</summary><p>Partie épaisse comprise entre l’ouverture et la clôture. Sa longueur représente l’écart entre ces deux prix.</p></details>',
          '<details><summary>Mèche (ombre)</summary><p>Trait fin reliant le corps aux extrêmes de la période. La mèche supérieure atteint le plus haut ; la mèche inférieure atteint le plus bas.</p></details>',
          '<details><summary>Bougie haussière</summary><p>Chandelier dont la clôture est supérieure à l’ouverture. La couleur verte est fréquente, mais dépend des réglages du graphique.</p></details>',
          '<details><summary>Bougie baissière</summary><p>Chandelier dont la clôture est inférieure à l’ouverture. La couleur rouge est fréquente, mais dépend des réglages du graphique.</p></details>',
          '<details><summary>Doji</summary><p>Chandelier dont l’ouverture et la clôture sont identiques ou très proches relativement à l’échelle observée. Son interprétation dépend du contexte.</p></details>',
          '<details><summary>Unité de temps (timeframe)</summary><p>Durée regroupée par chaque bougie temporelle : par exemple une minute, cinq minutes, une heure ou une journée.</p></details>',
          '<details><summary>Volume échangé</summary><p>Quantité ou valeur des échanges réalisés pendant une période. L’unité et le périmètre dépendent du marché et du fournisseur de données ; il ne s’agit pas simplement du nombre de transactions.</p></details>',
          '<details><summary>Histogramme de volume</summary><p>Ensemble de barres affichées sous les prix ; chaque barre représente le volume associé à un intervalle du graphique.</p></details>',
        '</div>',
      '</section>',

      '<section class="lesson-section" id="m12-retenir">',
        '<span class="lesson-kicker">08 · Synthèse</span>',
        '<h2>Ce qu’il faut absolument retenir.</h2>',
        '<div class="m12-takeaways">',
          '<article><span>01</span><b>Quatre prix, pas quatre prédictions</b><p>OHLC résume l’ouverture, le plus haut, le plus bas et la clôture d’un intervalle.</p></article>',
          '<article><span>02</span><b>Le corps n’est pas la mèche</b><p>Le corps relie ouverture et clôture ; les mèches montrent les extrêmes observés.</p></article>',
          '<article><span>03</span><b>L’unité de temps change le résumé</b><p>Une bougie de 1 heure agrège davantage de transactions qu’une bougie de 1 minute.</p></article>',
          '<article><span>04</span><b>Le volume mesure l’activité passée</b><p>Il ne représente pas automatiquement le déséquilibre acheteurs-vendeurs ni la profondeur disponible.</p></article>',
          '<article><span>05</span><b>Le contexte reste indispensable</b><p>Une forme ou une hausse de volume ne garantit jamais la direction suivante.</p></article>',
        '</div>',
        '<div class="lesson-callout"><strong>La checklist Atlas Crypto</strong><p>Avant d’interpréter une bougie, vérifie : quelle paire et quelle plateforme ? Quelle unité de temps ? La bougie est-elle clôturée ? Quelle est la source du volume et dans quelle unité est-il exprimé ? Que s’est-il passé avant et après ? Une seule bougie ne suffit jamais à raconter tout le marché.</p></div>',
      '</section>',

      '<section class="lesson-section" id="m12-quiz">',
        '<span class="lesson-kicker">09 · Vérification active</span>',
        '<h2>Vérifier tes acquis.</h2>',
        '<p>Réponds aux huit questions et lis les explications même lorsque ta réponse est correcte. Le but est de comprendre les limites de chaque représentation, pas seulement de reconnaître les couleurs.</p>',
        '<div class="quiz-progress-wrap"><div class="quiz-progress-track"><span id="quiz-progress-fill"></span></div><b id="quiz-progress-label">0 / 8 réponses</b></div>',
        '<div class="btc-quiz-set">',
          '<article class="quiz-question" data-question><span class="question-count">Question 1 / 8 · OHLC</span><h3>Que représente le H dans OHLC ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Open signifie ouverture. Le H correspond à High, donc au plus haut enregistré pendant la période.">Le prix d’ouverture</button><button type="button" data-correct="true" data-explanation="Exact. High désigne le prix le plus élevé atteint pendant l’intervalle du chandelier.">Le prix le plus haut de la période</button><button type="button" data-correct="false" data-explanation="Close désigne le prix de clôture, c’est-à-dire le dernier prix retenu à la fin de la période.">Le prix de clôture</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 2 / 8 · Corps</span><h3>Que relie le corps d’un chandelier ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. Le corps relie le prix d’ouverture au prix de clôture. Les mèches montrent les extrêmes au-delà de ces deux bornes.">L’ouverture et la clôture</button><button type="button" data-correct="false" data-explanation="Le plus haut et le plus bas se lisent aux extrémités des mèches, pas aux bords du corps.">Le plus haut et le plus bas</button><button type="button" data-correct="false" data-explanation="Le volume n’est pas encodé dans le corps d’une bougie classique ; il est généralement affiché séparément.">Le volume et le prix moyen</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 3 / 8 · Couleurs</span><h3>Dans la convention utilisée dans ce chapitre, quand une bougie verte est-elle haussière ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Une bougie n’est pas haussière parce que son plus haut est élevé : on compare la clôture à l’ouverture.">Quand son plus haut dépasse la bougie précédente</button><button type="button" data-correct="true" data-explanation="Exact. Elle est haussière lorsque le prix de clôture est supérieur au prix d’ouverture. Les couleurs restent configurables selon les plateformes.">Quand sa clôture est supérieure à son ouverture</button><button type="button" data-correct="false" data-explanation="La couleur ne dépend pas du volume dans notre convention. Elle indique le rapport entre clôture et ouverture.">Quand son volume est supérieur à la bougie précédente</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 4 / 8 · Mèches</span><h3>Une longue mèche supérieure prouve-t-elle qu’un retournement baissier va suivre ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Une mèche ne prédit pas la bougie suivante. Elle montre seulement que le prix a atteint un niveau puis a terminé l’intervalle ailleurs.">Oui, c’est un signal certain de retournement</button><button type="button" data-correct="true" data-explanation="Exact. Elle décrit une excursion vers un prix plus élevé que la zone d’ouverture ou de clôture. Il faut examiner le contexte et les périodes suivantes.">Non, elle décrit un mouvement passé, pas une certitude future</button><button type="button" data-correct="false" data-explanation="La mèche indique un prix extrême atteint, mais pas la cause ni l’identité de tous les participants.">Oui, elle indique précisément le nombre de vendeurs</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 5 / 8 · Unité de temps</span><h3>Que résume normalement une bougie sur un graphique de 15 minutes ?</h3><div class="quiz-options"><button type="button" data-correct="true" data-explanation="Exact. Une bougie temporelle de 15 minutes regroupe les prix et les transactions de cet intervalle. Ses valeurs évoluent tant que la période n’est pas terminée.">Les prix et le volume de l’intervalle de 15 minutes</button><button type="button" data-correct="false" data-explanation="Le nombre de transactions n’est pas fixé par une unité de temps : il varie selon l’activité du marché.">Toujours quinze transactions</button><button type="button" data-correct="false" data-explanation="Le timeframe ne signifie pas que la bougie conserve uniquement la clôture ; elle résume quatre prix et le volume associé.">Uniquement le prix de clôture de la journée</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 6 / 8 · Bougie en formation</span><h3>Pourquoi une bougie non clôturée peut-elle changer de couleur ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="La convention de couleur n’est pas liée au changement automatique du fuseau horaire pendant la bougie.">Parce que le fuseau horaire change pendant l’intervalle</button><button type="button" data-correct="true" data-explanation="Exact. Le prix actuel peut passer au-dessus puis en dessous de l’ouverture avant la fin de l’intervalle ; la clôture provisoire change donc.">Parce que le prix actuel peut repasser au-dessus ou en dessous de l’ouverture</button><button type="button" data-correct="false" data-explanation="Le volume ne fixe pas la couleur d’une bougie dans la convention haussière/baissière utilisée ici.">Parce que le volume dépasse un seuil fixe</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 7 / 8 · Volume</span><h3>Que représente une barre de volume classique sous une bougie ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="La barre de volume classique ne représente pas le nombre d’ordres qui attendent dans le carnet. Cela relève de la profondeur du carnet.">Les ordres en attente à cet instant</button><button type="button" data-correct="true" data-explanation="Exact. Elle représente le volume des transactions exécutées pendant l’intervalle, selon l’unité et la couverture de la source.">La quantité échangée pendant l’intervalle</button><button type="button" data-correct="false" data-explanation="Les contrats encore ouverts relèvent de l’open interest, une autre métrique des marchés dérivés.">Le nombre de contrats toujours ouverts</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<article class="quiz-question" data-question><span class="question-count">Question 8 / 8 · Esprit critique</span><h3>Que peux-tu conclure si le prix monte avec un volume plus élevé ?</h3><div class="quiz-options"><button type="button" data-correct="false" data-explanation="Un volume plus élevé ne garantit pas la poursuite du mouvement. Il décrit une activité plus forte pendant l’intervalle observé.">Le prix va nécessairement continuer à monter</button><button type="button" data-correct="false" data-explanation="Chaque transaction a un acheteur et un vendeur. Un volume total n’indique pas, à lui seul, un excédent net d’acheteurs.">Il y a forcément plus d’acheteurs que de vendeurs</button><button type="button" data-correct="true" data-explanation="Exact. Le prix a clôturé plus haut et davantage de volume a été échangé que dans la période de comparaison. Cela reste une observation, pas une prévision.">Le prix a progressé avec davantage d’activité échangée</button></div><p class="quiz-feedback" role="status"></p></article>',
          '<div class="quiz-summary" id="quiz-summary" aria-live="polite">0 / 8 réponses validées</div>',
          '<button class="quiz-reset" id="quiz-reset" type="button">Recommencer le quiz</button>',
        '</div>',
      '</section>',

      '<section class="lesson-section" id="m12-sources">',
        '<span class="lesson-kicker">10 · Références traçables</span>',
        '<h2>Sources et lectures complémentaires.</h2>',
        '<p>Les sources ci-dessous documentent la construction des graphiques, la lecture des chandeliers et les conventions de calcul du volume. Les définitions peuvent varier selon la place de marché et le fournisseur : les champs affichés sur la plateforme consultée restent la référence pour interpréter ses données.</p>',
        '<div class="source-list">',
          '<a href="https://www.cmegroup.com/fr/education/courses/technical-analysis/chart-types.html" target="_blank" rel="noopener noreferrer"><span>Éducation des marchés à terme · CME Group</span><b>Types de graphiques : chandeliers, lignes et barres</b><small>Différences entre graphiques en ligne, en barres et en chandeliers ; rôle du corps et des mèches ; unités temporelles et graphiques fondés sur les transactions.</small><em>Consulter le cours ↗</em></a>',
          '<a href="https://academy.ftmo.com/en/courses/technical-analysis-of-financial-markets/charts-and-timeframes/japanese-candlesticks" target="_blank" rel="noopener noreferrer"><span>Formation · FTMO Academy</span><b>Japanese Candlesticks: OHLC, Body and Wicks</b><small>Lecture des quatre prix OHLC et limites d’un chandelier : chronologie intrapériode, volume et contexte ne sont pas visibles dans une bougie seule.</small><em>Lire le module ↗</em></a>',
          '<a href="https://www.okx.com/en-eu/learn/what-is-trading-volume" target="_blank" rel="noopener noreferrer"><span>Marchés crypto · OKX Learn</span><b>What Is Trading Volume?</b><small>Différences entre volume, profondeur du carnet et open interest ; importance de la période, de l’unité et du périmètre des données comparées.</small><em>Lire le guide ↗</em></a>',
          '<a href="https://support.coinmarketcap.com/hc/en-us/articles/360043395912-Volume-Open-Interest-Market-Pair-Cryptoasset-Exchange-Aggregate" target="_blank" rel="noopener noreferrer"><span>Méthodologie des données · CoinMarketCap · mis à jour le 2 août 2026</span><b>Volume &amp; Open Interest</b><small>Exemples de volume exprimé en unités de cotation, de conversion et d’agrégation des volumes de paires et de plateformes.</small><em>Consulter la méthodologie ↗</em></a>',
        '</div>',
        '<p class="editorial-note"><b>Note éditoriale :</b> les prix, volumes, graphiques et simulations de cette fiche sont fictifs. Les couleurs sont des conventions d’affichage et peuvent être personnalisées. Cette fiche a un objectif éducatif ; elle ne constitue ni un conseil en investissement ni un signal de trading.</p>',
      '</section>'
    ].join('')
  }
});

window.initCandlesLessonInteractions = function(chapterNumber) {
  if (chapterNumber !== 12) return;

  const openInput = document.querySelector('#m12-open');
  const highInput = document.querySelector('#m12-high');
  const lowInput = document.querySelector('#m12-low');
  const closeInput = document.querySelector('#m12-close');
  const wick = document.querySelector('#m12-builder-wick');
  const body = document.querySelector('#m12-builder-body');
  const openLine = document.querySelector('#m12-builder-open-line');
  const closeLine = document.querySelector('#m12-builder-close-line');
  const highLabel = document.querySelector('#m12-builder-high-label');
  const lowLabel = document.querySelector('#m12-builder-low-label');
  const openLabel = document.querySelector('#m12-builder-open-label');
  const closeLabel = document.querySelector('#m12-builder-close-label');
  const builderFeedback = document.querySelector('#m12-builder-feedback');

  if (openInput && highInput && lowInput && closeInput && wick && body && builderFeedback) {
    const initial = {open: 100, high: 112, low: 96, close: 108};
    const format = value => value.toLocaleString('fr-FR', {maximumFractionDigits: 2});
    const updateBuilder = () => {
      const values = {
        open: Number(openInput.value),
        high: Number(highInput.value),
        low: Number(lowInput.value),
        close: Number(closeInput.value)
      };
      const validNumbers = Object.values(values).every(value => Number.isFinite(value) && value > 0 && value <= 1000000);
      const validRange = values.high >= Math.max(values.open, values.close) && values.low <= Math.min(values.open, values.close);
      if (!validNumbers || !validRange) {
        builderFeedback.textContent = 'Valeurs incohérentes : vérifie que tous les prix sont positifs, que le plus haut est supérieur ou égal à l’ouverture et à la clôture, et que le plus bas leur est inférieur ou égal.';
        builderFeedback.classList.add('is-alert');
        return;
      }
      const spread = Math.max(values.high - values.low, values.high * 0.02, 0.01);
      const top = values.high + spread * 0.2;
      const bottom = Math.max(0, values.low - spread * 0.2);
      const y = value => 255 - ((value - bottom) / (top - bottom)) * 205;
      const bodyTopPrice = Math.max(values.open, values.close);
      const bodyBottomPrice = Math.min(values.open, values.close);
      const rising = values.close > values.open;
      const falling = values.close < values.open;
      const color = rising ? '#22c55e' : falling ? '#ef4444' : '#94a3b8';
      const labelColor = rising ? '#86efac' : falling ? '#fca5a5' : '#cbd5e1';
      wick.setAttribute('y1', String(y(values.high)));
      wick.setAttribute('y2', String(y(values.low)));
      wick.setAttribute('stroke', color);
      body.setAttribute('y', String(y(bodyTopPrice)));
      body.setAttribute('height', String(Math.max(3, y(bodyBottomPrice) - y(bodyTopPrice))));
      body.setAttribute('fill', color);
      openLine.setAttribute('y1', String(y(values.open)));
      openLine.setAttribute('y2', String(y(values.open)));
      closeLine.setAttribute('y1', String(y(values.close)));
      closeLine.setAttribute('y2', String(y(values.close)));
      openLine.setAttribute('stroke', labelColor);
      closeLine.setAttribute('stroke', labelColor);
      highLabel.setAttribute('y', String(Math.max(18, y(values.high) - 8)));
      lowLabel.setAttribute('y', String(Math.min(275, y(values.low) + 16)));
      openLabel.setAttribute('y', String(y(values.open) + 4));
      closeLabel.setAttribute('y', String(y(values.close) + 4));
      highLabel.textContent = 'H ' + format(values.high);
      lowLabel.textContent = 'L ' + format(values.low);
      openLabel.textContent = 'O ' + format(values.open);
      closeLabel.textContent = 'C ' + format(values.close);
      builderFeedback.classList.remove('is-alert');
      const direction = rising ? 'haussière' : falling ? 'baissière' : 'doji (ouverture et clôture identiques)';
      const upperWick = values.high - Math.max(values.open, values.close);
      const lowerWick = Math.min(values.open, values.close) - values.low;
      builderFeedback.textContent = 'Bougie ' + direction + '. Corps : ' + format(Math.abs(values.close - values.open)) + ' ; mèche supérieure : ' + format(upperWick) + ' ; mèche inférieure : ' + format(lowerWick) + '. La forme décrit cet intervalle, elle ne prédit pas le suivant.';
      document.querySelector('#m12-builder-svg')?.setAttribute('aria-label', 'Chandelier ' + direction + ', ouverture ' + format(values.open) + ', plus haut ' + format(values.high) + ', plus bas ' + format(values.low) + ', clôture ' + format(values.close));
    };
    [openInput, highInput, lowInput, closeInput].forEach(input => input.addEventListener('input', updateBuilder));
    document.querySelector('#m12-builder-reset')?.addEventListener('click', () => {
      openInput.value = initial.open;
      highInput.value = initial.high;
      lowInput.value = initial.low;
      closeInput.value = initial.close;
      updateBuilder();
    });
    updateBuilder();
  }

  const pathLine = document.querySelector('#m12-path-line');
  const pathFeedback = document.querySelector('#m12-path-feedback');
  const pathButtons = [...document.querySelectorAll('[data-m12-path]')];
  if (pathLine && pathFeedback && pathButtons.length) {
    const paths = {
      a: {points: '55,150 165,205 275,95 385,40 505,95', text: 'Parcours A : le prix atteint d’abord le plus bas, puis le plus haut, avant de clôturer à 105.'},
      b: {points: '55,150 165,40 275,205 385,125 505,95', text: 'Parcours B : le prix atteint d’abord le plus haut, puis le plus bas, avant de clôturer à 105.'}
    };
    const renderPath = button => {
      const key = button.dataset.m12Path === 'b' ? 'b' : 'a';
      pathLine.setAttribute('points', paths[key].points);
      pathButtons.forEach(item => {
        const active = item === button;
        item.setAttribute('aria-pressed', String(active));
        item.classList.toggle('active', active);
      });
      pathFeedback.textContent = paths[key].text + ' Dans les deux cas, ouverture = 100, plus haut = 110, plus bas = 95 et clôture = 105 : le chandelier final est identique.';
    };
    pathButtons.forEach(button => button.addEventListener('click', () => renderPath(button)));
    renderPath(pathButtons[0]);
  }

  const scenarioButtons = [...document.querySelectorAll('[data-m12-scenario]')];
  const scenarioFeedback = document.querySelector('#m12-scenario-feedback');
  if (scenarioButtons.length && scenarioFeedback) {
    const scenarios = {
      'up-high': 'Le prix termine au-dessus de son ouverture et le volume est supérieur aux périodes comparées : davantage de transactions ont été réalisées pendant cette hausse. Cela ne garantit pas que le mouvement va continuer.',
      'up-low': 'Le prix progresse avec moins de volume que les périodes comparées. Cela décrit une activité plus faible pendant la hausse ; ce n’est ni une preuve de fragilité ni une annonce certaine de retournement.',
      'down-high': 'Le prix termine sous son ouverture avec un volume plus élevé. Cela montre une activité importante pendant la baisse, mais ne permet pas d’identifier à lui seul sa cause ni la direction suivante.',
      'down-low': 'Le prix recule avec moins de volume que les périodes comparées. Cela indique une activité plus faible pendant la baisse ; cela ne prouve pas que les vendeurs sont épuisés.'
    };
    scenarioButtons.forEach(button => button.addEventListener('click', () => {
      scenarioButtons.forEach(item => {
        const active = item === button;
        item.setAttribute('aria-pressed', String(active));
        item.classList.toggle('active', active);
      });
      scenarioFeedback.textContent = scenarios[button.dataset.m12Scenario] || '';
    }));
  }
};
