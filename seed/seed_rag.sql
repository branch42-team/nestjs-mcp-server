-- seed_rag.sql (Bun)

INSERT INTO "public"."course" ("id","createdAt","updatedAt","title","description","thumbnailUrl","isActive","duration","metadata") VALUES ('49b5aa81-cc61-4260-b64e-865064309454', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1', 'Ventus amo articulus ago titulus. Cogo calamitas aqua solium. Nemo esse id bestia confido adduco adinventitias modi.
Usus arma unde atqui assumenda. Arto adsuesco studio beatus fugiat quo tyrannus thorax calamitas. Tollo arca sollers voveo.', 'https://picsum.photos/seed/course1/800/450', true, 335, '{"domain":"engineering","level":"beginner","keywords":["backend","ui","api"]}');
INSERT INTO "public"."course" ("id","createdAt","updatedAt","title","description","thumbnailUrl","isActive","duration","metadata") VALUES ('8f401b95-bc70-4a51-ab20-f40254443e72', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2', 'Nihil velut comitatus. Sol cuppedia aduro usque decet. Vita corroboro arbustum allatus.
Laboriosam summopere tonsor curvo natus cupiditate sum celo despecto velum. Anser umquam non. Caterva sursum aer reiciendis callide bos capio.', 'https://picsum.photos/seed/course2/800/450', true, 336, '{"domain":"engineering","level":"advanced","keywords":["performance","sql","backend"]}');
INSERT INTO "public"."course" ("id","createdAt","updatedAt","title","description","thumbnailUrl","isActive","duration","metadata") VALUES ('06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3', 'Calco adipisci subnecto conatus cetera. Cogo tot sublime torqueo deporto suscipio amiculum dapifer. Ceno paulatim tubineus.
Quidem cuppedia pariatur absum agnosco dolor. Pecus tutis delectus nostrum reiciendis verus. Adhaero super tametsi maxime laboriosam dolore dignissimos sordeo aeneus.', 'https://picsum.photos/seed/course3/800/450', true, 611, '{"domain":"design","level":"beginner","keywords":["testing","cloud","sql"]}');

INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('6950c49e-269d-40f2-97e0-07140fa6fd65', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 1', 'Ducimus clementia deripio viduo conventus desidero architecto certus atque. Tristis collum amaritudo crepusculum turpis coerceo tricesimus. Teres acceptus amo vilicus traho.', 0, true, '49b5aa81-cc61-4260-b64e-865064309454');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('00bf804e-83c4-477a-9d52-7e62c8c5433c', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 2', 'Vilicus nisi commodi vitium depraedor surculus occaecati. Aperio pel ad umquam stips tenuis peccatus amet. Tantum neque accusantium alius speciosus sui venustas.', 1, true, '49b5aa81-cc61-4260-b64e-865064309454');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('43e09b53-7194-4704-b4bd-c0455a7164e0', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 3', 'Vae dolores claustrum tumultus. Hic viduo facere animus cupio quo aeneus. Eaque sollicito damnatio alioqui sopor thesis cito theca.', 2, true, '49b5aa81-cc61-4260-b64e-865064309454');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('6262d9b4-c8dc-45da-a7bd-44158162d781', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 1', 'Cubicularis curo similique. Socius vicinus cui currus sunt dedecor blandior contra. Credo bene consectetur arceo accusantium cattus arx vomica volaticus.', 0, true, '8f401b95-bc70-4a51-ab20-f40254443e72');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('fdbc2152-88de-4f2b-a5ce-898c423a0ae5', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 2', 'Adfectus tantum cognomen deserunt asporto tam una templum. Calco quibusdam stips valetudo theatrum alii acidus aduro sum amicitia. Cunae sequi triduana supplanto magni defluo astrum suggero clamo.', 1, true, '8f401b95-bc70-4a51-ab20-f40254443e72');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 3', 'Consuasor confero defendo. Votum defero exercitationem bonus thesis carus baiulus synagoga. Agnitio vomito ulterius.', 2, true, '8f401b95-bc70-4a51-ab20-f40254443e72');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 1', 'Confugo cultellus titulus sustineo creptio valens patruus theologus angustus terminatio. Deserunt celer vehemens textilis super curis aegre. Esse pax perspiciatis commemoro.', 0, true, '06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('c0c9d788-549e-456b-85e2-317137109330', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 2', 'Tero tergo adversus dolore delicate atque. Temeritas est cilicium consuasor aperte cena artificiose. Aetas cotidie contabesco.', 1, true, '06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90');
INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES ('7cf25fdd-8e52-448e-8d92-92bbede39e4a', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 3', 'Damnatio quidem celebrer turbo caute conculco validus. Alias agnitio amplexus accedo animadverto ara acies voluntarius ater ipsum. Damno amor apud quis.', 2, true, '06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90');

INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('68fdf1ad-3f67-4fcf-9cc8-f5e9c49156da', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 1 — Lesson 1: libero stillicidium crur', 'Vorax traho deserunt.', 'text', 'vibrant configuration Course 1 — Module 1 — Lesson 1: libero stillicidium crur

Patria cupressus theca urbs abstergo. Ademptio aeger admiratio cura ancilla tum adiuvo aut adulescens voro. Pecus pecus sponte curvo arcesso vulgivagus dolore strues alo arcesso.

Dapifer natus canto casso voluntarius defero canto. Voco concedo maiores cunctatio conculco demens distinctio vetus altus. Spiritus termes vergo ullam officia cetera articulus reprehenderit ascisco.
Sursum atrox deleniti clam. Infit victus adsidue creo absorbeo colligo speculum. Bos depereo claudeo aliquam demoror cena.
Despecto conqueror thesaurus abscido auditor vestigium peior tempus celer. Victoria caecus quae peior reiciendis condico amo deleniti cervus deporto. Vilis abundans cogito totam vinitor.

```js
console.log("Example 1");
```

Tollo contra demulceo stips tres curatio libero. Crebro suffoco turbo aro quia voluptatem vigor tenetur cruentus. Terra cinis voluptatibus casso.', NULL, NULL, 14, 0, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"6950c49e-269d-40f2-97e0-07140fa6fd65","moduleTitle":"vibrant configuration Course 1 — Module 1","type":"text","tags":["examples","basics"],"embedding":null,"lessonId":"68fdf1ad-3f67-4fcf-9cc8-f5e9c49156da"}', '6950c49e-269d-40f2-97e0-07140fa6fd65');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('bdee46ce-a7cd-4ec4-9e50-d855e3879010', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 1 — Lesson 2: adimpleo deserunt calco', 'Socius tego dolores ultio capio sperno sollers.', 'text', 'vibrant configuration Course 1 — Module 1 — Lesson 2: adimpleo deserunt calco

Caveo conspergo artificiose sui patruus denique. Suffragium tego deprimo dolor. Atrox peccatus tabernus crastinus succedo.

Numquam vulgo curia damno complectus baiulus defleo appello damno molestias. Inflammatio fugit theatrum totus porro demergo. Auxilium delectus coadunatio tutamen ademptio infit vicinus argumentum.
Adeo annus universe omnis assumenda turpis acies abduco. Arca cura calco apud voro dedico. Baiulus taedium aer deduco spargo crux vergo decipio quo compono.
Vado quam angulus conscendo compono. Autem spoliatio desino velum supplanto terra. Vitium mollitia acceptus vesica vos repellat.

```js
console.log("Example 2");
```

Angelus conculco cometes asporto curtus calamitas quisquam supellex. Ambulo villa stips soleo ademptio capio vergo. Expedita peccatus voveo nobis ipsa ager denique volup.', NULL, NULL, 11, 1, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"6950c49e-269d-40f2-97e0-07140fa6fd65","moduleTitle":"vibrant configuration Course 1 — Module 1","type":"text","tags":["strategy","basics"],"embedding":null,"lessonId":"bdee46ce-a7cd-4ec4-9e50-d855e3879010"}', '6950c49e-269d-40f2-97e0-07140fa6fd65');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('a2a54e31-15bf-47bf-a6d0-8d0da4f79efe', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 1 — Lesson 3: ascisco eaque crustulum', 'Apostolus contego adinventitias.', 'video', 'vibrant configuration Course 1 — Module 1 — Lesson 3: ascisco eaque crustulum

Tabgo rem delinquo confugo quisquam damno. Crur audacia labore crepusculum appositus succedo surculus. Tamquam aurum aperio denego.

Amissio doloribus territo adopto molestias quas. Adipisci bellum temperantia velum. Chirographum tonsor celo solitudo una atrocitas sophismata dolor commodo.
Volo cruentus vester sordeo. Certe abscido acceptus. Spiculum cohibeo astrum tabesco.
Cupressus abundans cado triduana. Timidus arbustum campana turbo officia similique suspendo aduro advoco. Desino demoror magnam perspiciatis incidunt conatus.

```js
console.log("Example 3");
```

Calamitas cui accusamus officiis cattus totus accommodo. Uterque tubineus bestia cognatus natus ascisco. Adnuo usus deripio turpis corrigo.', 'https://videos.example.com/c2c6cf93-cf91-4098-b4a2-4ffaff120edb.mp4', NULL, 8, 2, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"6950c49e-269d-40f2-97e0-07140fa6fd65","moduleTitle":"vibrant configuration Course 1 — Module 1","type":"video","tags":["strategy","basics"],"embedding":null,"lessonId":"a2a54e31-15bf-47bf-a6d0-8d0da4f79efe"}', '6950c49e-269d-40f2-97e0-07140fa6fd65');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('45fbf6a8-4d49-475c-a5e0-e87431e86999', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 2 — Lesson 1: attero currus verumtamen', 'Nostrum cognomen vesper vergo vinculum.', 'text', 'vibrant configuration Course 1 — Module 2 — Lesson 1: attero currus verumtamen

Texo solvo aetas. Fugiat vinco abbas maiores beatae carpo admoneo color. Cerno trado pecco credo calamitas trans carmen.

Enim similique contabesco veritas desidero labore celer barba. Vesco cui amicitia cattus adipiscor supplanto tamisium ventus. Omnis iste cogo suggero tremo verecundia.
Desipio paulatim facilis strues aperiam adopto vero vesper. Perferendis provident amita soleo alias crastinus crustulum. Balbus blanditiis alius conturbo conspergo.
Pecto aeternus audax comitatus conicio distinctio sit complectus. Adeptio triduana vorago tactus caritas turbo video impedit tabella canonicus. Stipes concido speciosus auctor tollo desolo.

```js
console.log("Example 4");
```

Viduo villa denego. Supra territo benigne textilis deludo apto vomer. Stips vaco repudiandae quisquam summa summa tutamen clarus odit.', NULL, NULL, 18, 0, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"00bf804e-83c4-477a-9d52-7e62c8c5433c","moduleTitle":"vibrant configuration Course 1 — Module 2","type":"text","tags":["strategy","api"],"embedding":null,"lessonId":"45fbf6a8-4d49-475c-a5e0-e87431e86999"}', '00bf804e-83c4-477a-9d52-7e62c8c5433c');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('f919e045-ec0d-4ff4-a3f8-933464f65105', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 2 — Lesson 2: viridis civis traho', 'Decimus taceo addo ultio somnus accedo xiphias.', 'quiz', 'vibrant configuration Course 1 — Module 2 — Lesson 2: viridis civis traho

Minus voluptatibus arbustum paens benevolentia patria coniuratio adsuesco. Blandior aliquam vae arguo. Benigne tumultus tabesco alienus comminor arma tui modi.

Mollitia caelestis aestus sponte sonitus anser voluptatum. Triumphus dolores explicabo certus aqua viriliter. Baiulus decumbo quas ventosus curis commodi urbanus compono velit.
Truculenter commemoro suadeo debitis synagoga. Caries artificiose cenaculum temptatio absorbeo error tracto vallum sodalitas voveo. Tergiversatio decimus arbustum cohaero volubilis depromo.
Utroque contigo ambitus dapifer degusto valetudo tepesco tibi bardus. Deleniti vesco cicuta tubineus laudantium amissio valens. Cohibeo colo amita vereor texo cultellus benevolentia despecto a accommodo.

```js
console.log("Example 5");
```

Subvenio incidunt teneo solum crux claudeo triduana bonus. Quisquam suffragium decimus aestivus. Angelus thermae statua laudantium.', NULL, NULL, 13, 1, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"00bf804e-83c4-477a-9d52-7e62c8c5433c","moduleTitle":"vibrant configuration Course 1 — Module 2","type":"quiz","tags":["api","strategy"],"embedding":null,"lessonId":"f919e045-ec0d-4ff4-a3f8-933464f65105"}', '00bf804e-83c4-477a-9d52-7e62c8c5433c');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('b0e0744d-0469-4271-9eb8-57dd67af3973', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 2 — Lesson 3: cubo aestivus iure', 'Colo audio universe accusamus fugit tener alveus tutamen praesentium templum.', 'quiz', 'vibrant configuration Course 1 — Module 2 — Lesson 3: cubo aestivus iure

Tabula statua cohaero communis voluptates. Thermae supra calamitas auxilium. Super bonus abundans addo.

Sollicito subvenio adeo ver abduco apostolus tollo correptius. Auctus stultus carpo talis spoliatio tepesco apud claudeo timidus agnosco. Voluptatibus teneo complectus.
Delibero conventus sortitus cilicium urbanus tubineus canis aspicio cilicium somniculosus. Paulatim adeo quasi armarium compello benevolentia vesica. Bestia cauda desipio cumque certe thymum velum calco.
Ipsam comedo officiis suus. Quibusdam adstringo victus. Creta abeo exercitationem infit cribro casus absens.

```js
console.log("Example 6");
```

Dolorum vulnus avaritia libero spes. Video summa arma ut una. Advenio delego vereor absum sustineo utpote vinco curo bene.', NULL, NULL, 9, 2, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"00bf804e-83c4-477a-9d52-7e62c8c5433c","moduleTitle":"vibrant configuration Course 1 — Module 2","type":"quiz","tags":["examples","api"],"embedding":null,"lessonId":"b0e0744d-0469-4271-9eb8-57dd67af3973"}', '00bf804e-83c4-477a-9d52-7e62c8c5433c');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('c7999fd1-7e62-475a-a293-5f561607dfdf', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 3 — Lesson 1: deprimo civis voco', 'Nemo traho subseco quod peccatus adhuc.', 'text', 'vibrant configuration Course 1 — Module 3 — Lesson 1: deprimo civis voco

Sodalitas avaritia candidus excepturi tenetur demum tepesco supplanto. Admoveo vetus vulgivagus suppono vinitor pariatur cibus. Autus xiphias corrigo sulum sophismata stips aliquam absconditus adaugeo.

Denique amplus ceno vespillo thalassinus tepidus. Adversus quod abstergo tamen credo testimonium sed. Considero stella blandior tonsor debilito cogito cimentarius tergum.
Ara demoror aureus pax volaticus comburo. Antepono cupiditate utrum cilicium dolorum claro spero acer vilitas. Cupiditate tamen crepusculum voluptates vitae consequatur demonstro.
Appello correptius curis crinis utique vis cupiditate circumvenio auditor defluo. Aegrotatio depereo crudelis. Tenuis corrupti amplus debilito.

```js
console.log("Example 7");
```

Aqua maxime succedo claro tutis correptius vorax spero. Chirographum tabesco defleo tribuo corporis quisquam caritas amplitudo. Aspernatur utique denique magnam tabgo sordeo.', NULL, NULL, 17, 0, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"43e09b53-7194-4704-b4bd-c0455a7164e0","moduleTitle":"vibrant configuration Course 1 — Module 3","type":"text","tags":["api","strategy"],"embedding":null,"lessonId":"c7999fd1-7e62-475a-a293-5f561607dfdf"}', '43e09b53-7194-4704-b4bd-c0455a7164e0');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('7739a7bd-520c-4709-8952-6984c610d839', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 3 — Lesson 2: iste adopto cognatus', 'Cinis aestivus tracto comis tendo veniam sumptus arceo textilis.', 'text', 'vibrant configuration Course 1 — Module 3 — Lesson 2: iste adopto cognatus

Veritas surculus audio acer aeneus utrimque labore bellicus complectus. Audentia temporibus acidus audeo consequuntur aeger. Cribro tenuis toties patruus perspiciatis strenuus votum.

Uterque hic cunae alius comitatus modi. Delibero cariosus utrimque quam agnitio magnam adflicto tertius coadunatio conforto. Bene sollers decerno termes.
Quibusdam congregatio vulnus suasoria. Atque volaticus abeo. Provident suus aestas capitulus dolore.
Adipisci rem talus uberrime ducimus tremo solitudo ea sto conturbo. Conitor caste defero. Cur depereo magni crustulum candidus vaco vindico super temperantia.

```js
console.log("Example 8");
```

Candidus conduco civitas id decens placeat recusandae aranea debitis est. Stultus suffragium deorsum nulla rerum attollo dolorum atrocitas auxilium comminor. Magnam atqui curvo arbor vulgivagus abscido adaugeo ipsam.', NULL, NULL, 21, 1, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"43e09b53-7194-4704-b4bd-c0455a7164e0","moduleTitle":"vibrant configuration Course 1 — Module 3","type":"text","tags":["strategy","api"],"embedding":null,"lessonId":"7739a7bd-520c-4709-8952-6984c610d839"}', '43e09b53-7194-4704-b4bd-c0455a7164e0');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('5f1aae0f-0087-47b0-8f50-28246ac5fc12', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'vibrant configuration Course 1 — Module 3 — Lesson 3: adfectus vigor cruciamentum', 'Cernuus vobis tonsor.', 'quiz', 'vibrant configuration Course 1 — Module 3 — Lesson 3: adfectus vigor cruciamentum

Studio templum nam articulus tenetur tristis nobis cunae. Doloribus sponte cedo summa decimus debitis vehemens votum valde stabilis. Celo impedit una magnam totus laudantium.

Facere abscido optio suscipio. Dolor clamo torqueo auxilium alias tres vulnero caritas tabula. Blandior aperio curiositas adhuc tergo adfectus sint caput.
Similique concedo aegre. Curriculum aperio terminatio denique. Audentia conscendo contabesco acies thermae sonitus.
Curia delinquo aufero cetera unus absque labore depono cogo ambulo. Nihil cinis uterque cariosus. Victus vulgo repellat ventito pecto clementia.

```js
console.log("Example 9");
```

Vere adhaero praesentium defaeco laboriosam beneficium crudelis utilis sui vulticulus. Vestigium cursim coaegresco curia. Consuasor arcesso vicissitudo.', NULL, NULL, 11, 2, true, '{"courseId":"49b5aa81-cc61-4260-b64e-865064309454","courseTitle":"vibrant configuration Course 1","moduleId":"43e09b53-7194-4704-b4bd-c0455a7164e0","moduleTitle":"vibrant configuration Course 1 — Module 3","type":"quiz","tags":["basics","examples"],"embedding":null,"lessonId":"5f1aae0f-0087-47b0-8f50-28246ac5fc12"}', '43e09b53-7194-4704-b4bd-c0455a7164e0');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('5635f2e7-7d47-47a1-9c7d-ee58124f03ac', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 1 — Lesson 1: blandior iusto sunt', 'Sit cupiditas magnam suasoria solus.', 'document', 'taut cow Course 2 — Module 1 — Lesson 1: blandior iusto sunt

Assentator nisi uberrime suppono atrocitas tenetur spargo. Audeo territo certe alius capitulus xiphias. Audeo constans confero tergiversatio commodi ipsum ullus balbus undique callide.

Facere bellicus subiungo damnatio valde. Tergum aer cogo votum. Carmen rem decerno quidem credo acsi abstergo.
Celo pecco officia coma tibi calculus. Arca amplitudo tamen perferendis. Solium quam amita virgo argentum qui damnatio.
Apto accusamus alienus succurro enim carus unde super. Vivo numquam thesis ceno vapulus amplitudo suus civis sum tunc. Bellicus sopor totam non utique deporto.

```js
console.log("Example 10");
```

Quia tergeo casus triduana cito aufero supra aliqua. Cultellus amo qui tum debeo tactus cetera causa caute. Commodi arbitro alioqui comes fuga tibi id.', NULL, 'https://docs.example.com/5b6c1cf9-bba1-4e1b-bfaa-0dd6f91bd909.pdf', 4, 0, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"6262d9b4-c8dc-45da-a7bd-44158162d781","moduleTitle":"taut cow Course 2 — Module 1","type":"document","tags":["examples","api"],"embedding":null,"lessonId":"5635f2e7-7d47-47a1-9c7d-ee58124f03ac"}', '6262d9b4-c8dc-45da-a7bd-44158162d781');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('c491a18a-d8bb-4d82-83ae-7579332a20ed', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 1 — Lesson 2: carus voluntarius uredo', 'Bardus iste vallum harum tamdiu strues bis barba conqueror bonus.', 'document', 'taut cow Course 2 — Module 1 — Lesson 2: carus voluntarius uredo

Corona templum volubilis terebro virtus concedo cras adiuvo ubi. Catena ipsam vivo amet arma aeternus solitudo odio crastinus. Delinquo cum virgo congregatio altus aeternus cruciamentum fugiat.

Attero incidunt vereor cohibeo. Cupiditate somniculosus ustilo. Crinis aestivus officiis deinde conqueror totam sponte cariosus.
Tamisium creo acsi libero nulla. Saepe animus vestrum comedo. Deputo acidus adimpleo damnatio iste.
Teneo fugiat tepidus substantia. Tutamen vindico antea considero temeritas creptio attero. Odit voveo sustineo nemo aestus.

```js
console.log("Example 11");
```

Armarium utor defetiscor arguo voro verbum aequus. Torrens depromo antea temptatio vivo crebro auditor nulla dolorum. Suus corrupti cetera talio termes atrocitas cibo vesco eaque.', NULL, 'https://docs.example.com/532810f5-8713-4e2b-9573-11e42d154f95.pdf', 18, 1, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"6262d9b4-c8dc-45da-a7bd-44158162d781","moduleTitle":"taut cow Course 2 — Module 1","type":"document","tags":["basics","api"],"embedding":null,"lessonId":"c491a18a-d8bb-4d82-83ae-7579332a20ed"}', '6262d9b4-c8dc-45da-a7bd-44158162d781');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('81dc5c83-58a7-4d9f-b8d3-2775cf1f675c', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 1 — Lesson 3: totam perspiciatis nam', 'Vulariter abduco supplanto deputo.', 'document', 'taut cow Course 2 — Module 1 — Lesson 3: totam perspiciatis nam

Desino cariosus voco cruentus triduana facere suasoria adeptio amet. Repellendus utilis surculus aestas spero. Laboriosam sordeo usus corporis abbas excepturi curto facilis cariosus adamo.

Tempus cinis perferendis subnecto sapiente. Patrocinor absque vomito deputo. Aptus conforto utroque cena abutor considero architecto cedo deinde tamisium.
Asporto accusamus armarium temeritas defessus canto votum. Casso calcar ascit curia voluptas timidus non aveho. Curvo stella cupio valens.
Villa alioqui ipsa sonitus dolorem considero iste. Tripudio avaritia campana aequitas caelum super. Vaco delectus umbra tolero.

```js
console.log("Example 12");
```

Speculum acerbitas demoror paulatim temporibus turba thema ademptio thermae. Tristis consectetur accommodo minus nihil approbo deporto deludo patrocinor varius. Varietas vere tutis tubineus cunae.', NULL, 'https://docs.example.com/85c628c1-1c24-403c-861f-5bb99caff337.pdf', 12, 2, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"6262d9b4-c8dc-45da-a7bd-44158162d781","moduleTitle":"taut cow Course 2 — Module 1","type":"document","tags":["basics","examples"],"embedding":null,"lessonId":"81dc5c83-58a7-4d9f-b8d3-2775cf1f675c"}', '6262d9b4-c8dc-45da-a7bd-44158162d781');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('c7a16360-0542-4d13-9086-7a24ca6000e9', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 2 — Lesson 1: tergum alter subnecto', 'Trucido ascit aspicio aptus carbo trans.', 'video', 'taut cow Course 2 — Module 2 — Lesson 1: tergum alter subnecto

Demonstro comis tactus tempus auxilium demergo ambitus alter capto vulpes. Curriculum odio thalassinus temeritas est corona tersus subito. Acidus sol calco.

Depereo triumphus corrumpo. Succedo tamquam bonus alo odio calamitas conturbo. Bardus arcesso rerum.
Delinquo volva vestigium advoco. Temeritas colo aduro neque supra. Aggredior fugiat trucido arceo suscipio aurum conservo.
Demonstro earum terebro quod sufficio delicate video arguo acer voveo. Vociferor velut aufero quaerat thalassinus civis nostrum. Avaritia vesper surgo tergum omnis basium ars cruentus ara tripudio.

```js
console.log("Example 13");
```

Dolorem constans causa delibero argumentum termes quia. Suffoco vociferor tantum. Abstergo uredo attonbitus combibo aequitas beneficium paulatim adeptio.', 'https://videos.example.com/7b9388c6-8d0c-4317-abeb-aa8efd4d1122.mp4', NULL, 3, 0, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"fdbc2152-88de-4f2b-a5ce-898c423a0ae5","moduleTitle":"taut cow Course 2 — Module 2","type":"video","tags":["examples","strategy"],"embedding":null,"lessonId":"c7a16360-0542-4d13-9086-7a24ca6000e9"}', 'fdbc2152-88de-4f2b-a5ce-898c423a0ae5');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('ad6116b1-8f19-4e1c-9e5d-f0b9a209747b', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 2 — Lesson 2: tenax verumtamen usque', 'Spes curto tamen beneficium corpus vigilo avarus conventus venustas distinctio.', 'quiz', 'taut cow Course 2 — Module 2 — Lesson 2: tenax verumtamen usque

Denego bestia culpa tantillus vicissitudo paens arcus. Voluptatum harum copiose harum curia addo abutor nesciunt laboriosam. Corrupti audacia volo virtus aufero cornu auxilium socius attonbitus arbor.

Sed commodi absum celer cuius succurro tergo. Tamquam vergo caelestis carbo sumo tolero thesaurus triduana verumtamen taedium. Degusto sint adfero tepesco laborum.
Appello illo surgo repellat careo armarium. Adfero cibus vilicus deporto ancilla astrum cauda. Amoveo natus amplus tantillus decerno quas accendo tolero calcar.
Voluptate cervus conor vester sed thymum vorago timidus. Clam traho vicissitudo thorax. Uberrime verus delectus callide harum eligendi doloremque.

```js
console.log("Example 14");
```

Cuppedia combibo urbs. Soleo vesper adeptio tutamen unde. Super utroque tergeo claudeo tollo clementia.', NULL, NULL, 21, 1, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"fdbc2152-88de-4f2b-a5ce-898c423a0ae5","moduleTitle":"taut cow Course 2 — Module 2","type":"quiz","tags":["basics","api"],"embedding":null,"lessonId":"ad6116b1-8f19-4e1c-9e5d-f0b9a209747b"}', 'fdbc2152-88de-4f2b-a5ce-898c423a0ae5');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('7ce48396-5b93-4840-86b3-489f79ffe5a5', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 2 — Lesson 3: somniculosus assentator turbo', 'Ad aptus tempore sublime solutio claudeo cur.', 'document', 'taut cow Course 2 — Module 2 — Lesson 3: somniculosus assentator turbo

Suadeo sopor arca deprimo denuo ater adaugeo. Ut triduana cupiditate minus neque clamo caveo ocer. Thermae aspicio cado vulnero tepesco tergeo perferendis avaritia adiuvo curriculum.

Coaegresco sublime tametsi sodalitas patrocinor. Ulciscor pecco subiungo numquam vitae decerno tribuo crustulum. Creptio curriculum verecundia.
Bene nam demergo possimus ara auxilium succurro accusantium ut. Civis auctor aspicio saepe amicitia subito derideo. Eveniet cui vix demulceo adimpleo verbum dolore tristis temporibus.
Voluptatem dolore iusto calamitas vos. Defendo corpus depraedor urbs video amet. Cognomen virgo exercitationem nesciunt attero textilis arceo.

```js
console.log("Example 15");
```

Charisma vinum articulus animus vulpes vere ulciscor. Accedo adaugeo certus earum ustilo approbo coadunatio cupressus quo callide. Crepusculum atrox cimentarius tenax comburo similique cruentus deduco acerbitas at.', NULL, 'https://docs.example.com/c2a5c7b9-284b-4db3-b245-640f956f1751.pdf', 8, 2, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"fdbc2152-88de-4f2b-a5ce-898c423a0ae5","moduleTitle":"taut cow Course 2 — Module 2","type":"document","tags":["strategy","api"],"embedding":null,"lessonId":"7ce48396-5b93-4840-86b3-489f79ffe5a5"}', 'fdbc2152-88de-4f2b-a5ce-898c423a0ae5');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('3c9baef8-c698-49c1-954f-ee1163477bbe', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 3 — Lesson 1: delectatio inflammatio corporis', 'Suscipio solum catena.', 'quiz', 'taut cow Course 2 — Module 3 — Lesson 1: delectatio inflammatio corporis

Deinde demonstro aranea stillicidium degenero terror quibusdam calcar. Accommodo hic agnitio fugit abstergo omnis collum velociter. Tibi villa at arbustum spoliatio turba.

At depereo conculco video adopto antiquus. Depulso verumtamen decretum thymum vos vilis antiquus utique venustas avarus. Adflicto succedo bellicus doloribus aestas degero somnus undique cibo vesco.
Denuncio vero sustineo cena. Aequus pariatur suspendo curia subseco temeritas. Minus defetiscor vulpes demergo tantum cerno cernuus.
Sed cimentarius communis cruentus cetera campana aeneus spoliatio. Pecto animus decipio baiulus stultus condico repellendus accusantium umerus votum. Aspicio nihil voluptatibus amplus solio reiciendis asperiores illo curo.

```js
console.log("Example 16");
```

Viscus cras verus sono velut uberrime. Demoror verus substantia tui adeo. Urbs denuncio vereor.', NULL, NULL, 3, 0, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe","moduleTitle":"taut cow Course 2 — Module 3","type":"quiz","tags":["basics","examples"],"embedding":null,"lessonId":"3c9baef8-c698-49c1-954f-ee1163477bbe"}', '4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('dadd2d7e-5d1b-4436-9c6d-e3c783b137b3', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 3 — Lesson 2: inventore ullam corpus', 'Nulla dolorem odit varietas stabilis cogo sopor ipsum delicate conscendo.', 'quiz', 'taut cow Course 2 — Module 3 — Lesson 2: inventore ullam corpus

Convoco ascisco at rem causa sophismata arbor. Sustineo timor videlicet caritas delibero. Ipsum vindico acidus nobis in aveho curto.

Comparo in aspicio. Amet crepusculum cupiditate cicuta conventus somniculosus. Victus vitiosus decimus deprimo sulum cupressus.
Tendo anser annus circumvenio terminatio adicio sumo. Sperno saepe sublime angulus harum thymbra possimus alo clibanus antiquus. Vilis cotidie minus.
Casus id curis cupiditas verbera armarium comis. Calamitas defero cur eaque rerum thymum aeger decerno solitudo. Tero adamo video.

```js
console.log("Example 17");
```

Coruscus demergo autem. Appositus adfero admoneo torrens tribuo vilis amiculum facilis. Valens atque abutor balbus thorax tribuo curso adulescens antea.', NULL, NULL, 10, 1, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe","moduleTitle":"taut cow Course 2 — Module 3","type":"quiz","tags":["examples","api"],"embedding":null,"lessonId":"dadd2d7e-5d1b-4436-9c6d-e3c783b137b3"}', '4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('a852742a-35a8-4f86-a942-64dfd076ca15', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'taut cow Course 2 — Module 3 — Lesson 3: cibo caelestis auditor', 'Ex delicate comitatus calcar chirographum iste umerus depono cervus.', 'document', 'taut cow Course 2 — Module 3 — Lesson 3: cibo caelestis auditor

Campana xiphias perspiciatis. Advenio utor fuga tracto sortitus illo facilis cur vinitor allatus. Assumenda supra suppono depono comparo speciosus.

Turpis cariosus aptus ducimus. Voluptatem eveniet varius spectaculum sonitus culpo vulgo aeneus. Nesciunt demitto via decumbo careo adficio porro alioqui hic tenus.
Consuasor abstergo alienus armarium modi suus sumo ultio odit. Surgo sulum crur. Accendo desipio sui audio adsuesco.
Optio cuius artificiose umbra asporto uberrime ipsum occaecati. Acidus conventus atrocitas doloremque amissio verto convoco. Cohors vere curso.

```js
console.log("Example 18");
```

Abeo iure repellendus assentator. Perferendis vae antea condico taceo. Ara utpote volo amo adamo coruscus.', NULL, 'https://docs.example.com/12225440-0e9f-4328-ba82-202b2daa825c.pdf', 2, 2, true, '{"courseId":"8f401b95-bc70-4a51-ab20-f40254443e72","courseTitle":"taut cow Course 2","moduleId":"4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe","moduleTitle":"taut cow Course 2 — Module 3","type":"document","tags":["examples","basics"],"embedding":null,"lessonId":"a852742a-35a8-4f86-a942-64dfd076ca15"}', '4bccf8a5-0dc9-4a63-b37c-5dbfd7d761fe');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('084669d3-c7f1-499f-beee-eb810cd2dd05', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 1 — Lesson 1: vel vaco nulla', 'Vinitor cattus cornu ceno ascit turbo caecus adnuo abutor cavus.', 'document', 'pushy footrest Course 3 — Module 1 — Lesson 1: vel vaco nulla

Admitto laborum cavus illum adficio et tardus tui. Addo surculus traho tredecim tubineus crux. Approbo magni sui calamitas ulterius cornu volubilis.

Allatus absorbeo crustulum adfero aiunt spero sophismata eveniet. Thesis commodo creo ustilo atqui patria. Harum tergo vestigium colligo.
Clamo cinis ars vel demum viduo defaeco tibi. Amplexus delectus vulpes ducimus beatus ex cupiditate. Collum officiis ipsam cometes utpote ultio cito aequitas.
Aurum vulgivagus synagoga. Adhuc umquam incidunt velum caritas corona censura tabella tot. Delego tibi eos aut taceo usitas caterva desolo sequi.

```js
console.log("Example 19");
```

Nobis conventus amplus vester catena vulnus utique volutabrum. Magni audacia beneficium templum vulgo talio pectus autus. Trepide sufficio bellum alveus cado cum vitae.', NULL, 'https://docs.example.com/13edfbba-c6bc-4ee5-bf78-77ccf68eb820.pdf', 9, 0, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe","moduleTitle":"pushy footrest Course 3 — Module 1","type":"document","tags":["strategy","examples"],"embedding":null,"lessonId":"084669d3-c7f1-499f-beee-eb810cd2dd05"}', '0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('1ba1903b-b87d-4e89-82a2-daec1d5a5d7e', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 1 — Lesson 2: video casso depono', 'Ter urbanus crux convoco.', 'text', 'pushy footrest Course 3 — Module 1 — Lesson 2: video casso depono

Pectus consuasor cetera studio candidus peior sint vel. Tenuis aurum theologus iure aperiam absorbeo corpus quibusdam optio. Aliquam deorsum substantia tantum approbo statua.

Ambulo una vinitor xiphias complectus peccatus collum commodo vivo. Neque ullam vae ambulo subnecto ad addo aegrus tenetur. Censura vigor turbo alii vae agnosco error ubi.
Nulla accedo dolor depono antepono. Tergum aequitas doloribus sustineo baiulus corroboro antea adsum. Capitulus aedificium chirographum eligendi basium angulus astrum stella.
Patruus deorsum utique adicio arma volup conventus attonbitus quae arbor. Culpa vulnus blandior tergo calco contra illum terga fugiat tamen. Curtus terebro minima pectus amplexus arx.

```js
console.log("Example 20");
```

Aiunt ut ustilo comparo sonitus coruscus. Vinitor venio caveo eos arca aequus animadverto. Perferendis laborum ara.', NULL, NULL, 14, 1, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe","moduleTitle":"pushy footrest Course 3 — Module 1","type":"text","tags":["basics","examples"],"embedding":null,"lessonId":"1ba1903b-b87d-4e89-82a2-daec1d5a5d7e"}', '0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('8a7e2afd-e242-4c77-b564-6112a77eeee7', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 1 — Lesson 3: conor artificiose pax', 'Triduana uterque maiores cinis coepi vero defaeco sursum.', 'text', 'pushy footrest Course 3 — Module 1 — Lesson 3: conor artificiose pax

Cariosus cursus pecco utroque labore architecto bellicus recusandae ex. Patria spoliatio tres campana ademptio. Utrimque adulatio crustulum asper sulum blanditiis culpa.

Aestivus terra curvo vos soluta decens advenio decretum. Subito deprecator mollitia ancilla calco. Aurum voro volo videlicet defluo verecundia ustilo abstergo temeritas.
Cunabula theologus colo calamitas beneficium crastinus asper stipes verto cernuus. Conculco cogito crudelis strenuus. Carus talis molestias acerbitas vilis pecus itaque nesciunt virgo.
Exercitationem deripio alveus stultus quibusdam conicio. Cunabula conitor sonitus cimentarius atrocitas claustrum. Velit arbustum utor valeo officiis auditor.

```js
console.log("Example 21");
```

Vulpes adsum viriliter vergo defaeco tenuis suppono. Cometes solium saepe temptatio et tremo. Atavus antea communis undique hic suasoria dapifer.', NULL, NULL, 10, 2, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe","moduleTitle":"pushy footrest Course 3 — Module 1","type":"text","tags":["examples","basics"],"embedding":null,"lessonId":"8a7e2afd-e242-4c77-b564-6112a77eeee7"}', '0b9e0ef1-c068-4fa5-a656-b701bbf1b9fe');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('2ddde1a7-8bd9-4a11-b7f4-45b4e9c66947', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 2 — Lesson 1: est laudantium stultus', 'Arx arca decet adduco.', 'video', 'pushy footrest Course 3 — Module 2 — Lesson 1: est laudantium stultus

Validus angelus tempore nobis vinum vita eaque suggero. Esse conservo reiciendis. Ventosus voveo amplus amissio iusto crustulum tepidus deserunt.

Appello vomito totam. Cena teres bibo vomito coma creptio temptatio. Aperiam eum earum abstergo amoveo aestas consuasor odit una.
Appono demo quidem. Tribuo vulgus viscus trado coadunatio. Admiratio soleo depulso cuius pel canonicus crepusculum.
Cogito amet quibusdam cohors pauci error vulgus adipisci architecto. Vesco suspendo surgo corrigo. Aranea autem aliqua.

```js
console.log("Example 22");
```

Adsidue contego thorax illum suppono. Allatus quia tollo veniam compello via thorax natus convoco conforto. Absconditus comptus vapulus.', 'https://videos.example.com/8335f0cf-137e-416b-852c-3f48e2d6fcb3.mp4', NULL, 8, 0, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"c0c9d788-549e-456b-85e2-317137109330","moduleTitle":"pushy footrest Course 3 — Module 2","type":"video","tags":["basics","strategy"],"embedding":null,"lessonId":"2ddde1a7-8bd9-4a11-b7f4-45b4e9c66947"}', 'c0c9d788-549e-456b-85e2-317137109330');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('316abfd9-d27c-4204-b41d-43daff99b735', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 2 — Lesson 2: illum voluptas sollicito', 'Vitium aspernatur vinum laudantium.', 'video', 'pushy footrest Course 3 — Module 2 — Lesson 2: illum voluptas sollicito

Tergiversatio arx conspergo aeternus voluptatum ambulo vicinus crux. Spargo pax cura dapifer. Video coadunatio correptius non cerno astrum ultra solio tendo.

Utor basium calculus magni celo explicabo. Xiphias territo defleo tero victoria perspiciatis tutamen thymum. Utrimque talio ubi utique vinco cerno libero.
Colo aetas dolores cito. Tollo trucido volubilis sint. Celebrer tremo succedo caterva absconditus tepesco.
Conturbo adamo universe taceo attonbitus spiritus cultellus cupio amiculum. Coadunatio tersus occaecati. Occaecati depraedor excepturi suadeo.

```js
console.log("Example 23");
```

Sunt uredo animus desino amplus tergum abscido numquam nisi. Caput arcesso corroboro. Iste defungo vergo alienus decerno ancilla cupressus contego absorbeo armarium.', 'https://videos.example.com/910ead19-6b83-42be-9370-3724e61dc2e2.mp4', NULL, 12, 1, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"c0c9d788-549e-456b-85e2-317137109330","moduleTitle":"pushy footrest Course 3 — Module 2","type":"video","tags":["examples","api"],"embedding":null,"lessonId":"316abfd9-d27c-4204-b41d-43daff99b735"}', 'c0c9d788-549e-456b-85e2-317137109330');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('0b8f9031-be69-4e03-8ac5-329393f2ed0c', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 2 — Lesson 3: adversus ante accusator', 'Eveniet tempora vorax abduco inventore bellum assentator ea.', 'quiz', 'pushy footrest Course 3 — Module 2 — Lesson 3: adversus ante accusator

Turpis atrox via nihil in trucido optio volaticus cavus creta. Valens delinquo adversus ager sophismata. Sursum absorbeo atrox tondeo crapula summopere ager cornu alii subiungo.

Damno patria recusandae truculenter adiuvo demonstro corrumpo terreo. Bibo tergum suus abscido. Victoria cotidie delinquo cognomen canonicus.
Torqueo abstergo convoco paulatim. Arca degusto natus conforto. Annus desipio demoror coepi.
Adsuesco coerceo sophismata ventosus cupio. Depopulo vigilo super. Acsi taceo porro torqueo summopere depromo cernuus.

```js
console.log("Example 24");
```

Aestivus strenuus tracto apto aliquid. Certus sequi vobis. Curia usus adsuesco.', NULL, NULL, 3, 2, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"c0c9d788-549e-456b-85e2-317137109330","moduleTitle":"pushy footrest Course 3 — Module 2","type":"quiz","tags":["basics","api"],"embedding":null,"lessonId":"0b8f9031-be69-4e03-8ac5-329393f2ed0c"}', 'c0c9d788-549e-456b-85e2-317137109330');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('61489325-9259-4ef1-a009-2fa4373072f7', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 3 — Lesson 1: campana alienus talis', 'Accendo degero amaritudo denego vinum itaque ustilo aurum theologus numquam.', 'video', 'pushy footrest Course 3 — Module 3 — Lesson 1: campana alienus talis

Suasoria tibi quod vinco. Officiis adhuc timidus thema currus. Subnecto commodi desidero ipsa cruciamentum stips carbo careo.

Cursus et clementia campana. Magnam cavus quasi aufero torqueo neque acervus aestus. Commodi thesis cilicium suus aeger eos.
Tutamen adipiscor nam subnecto adopto calculus depromo. Cruentus aggredior adnuo cervus cernuus thesaurus absconditus. Acervus tepesco patria collum volo sequi summisse admoveo.
Velit suppellex debilito. Impedit corrumpo vulgivagus possimus teres alioqui taceo. Eos spero vitae audacia ut tolero despecto anser vir antea.

```js
console.log("Example 25");
```

Pauper assentator abeo denique. Cruentus viriliter apud cunctatio. Absconditus saepe vespillo vorago.', 'https://videos.example.com/ea7378bd-a7d9-4ba1-903b-8b99ea9402bd.mp4', NULL, 19, 0, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"7cf25fdd-8e52-448e-8d92-92bbede39e4a","moduleTitle":"pushy footrest Course 3 — Module 3","type":"video","tags":["basics","api"],"embedding":null,"lessonId":"61489325-9259-4ef1-a009-2fa4373072f7"}', '7cf25fdd-8e52-448e-8d92-92bbede39e4a');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('c622a439-6631-447f-8155-4ba1d7924060', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 3 — Lesson 2: patruus ancilla impedit', 'Cur ducimus tibi fugiat comis curvo conturbo adhuc aestivus decet.', 'quiz', 'pushy footrest Course 3 — Module 3 — Lesson 2: patruus ancilla impedit

Decor cupiditate varius decor charisma tandem. Ea cilicium vinum contigo ambitus suscipio titulus corroboro. Atque canis tego unde conicio adsum defluo deserunt.

Barba absens culpo comburo aggero admiratio aliquam. Conculco amplus bos cubitum verbera demoror comis. Cumque vaco eligendi supellex abscido carcer.
Corporis valeo totus valeo bis doloribus. Architecto cornu cur. Cogo aestus ultio thesaurus somniculosus.
Vergo caecus denuncio debilito cui ubi. Depono cupressus animadverto aggredior tumultus deleniti articulus strenuus pauper. Confido aufero ultra.

```js
console.log("Example 26");
```

Ademptio amplus volva cimentarius denuncio. Placeat vae administratio. Cubo canto claro ago custodia corpus.', NULL, NULL, 15, 1, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"7cf25fdd-8e52-448e-8d92-92bbede39e4a","moduleTitle":"pushy footrest Course 3 — Module 3","type":"quiz","tags":["api","strategy"],"embedding":null,"lessonId":"c622a439-6631-447f-8155-4ba1d7924060"}', '7cf25fdd-8e52-448e-8d92-92bbede39e4a');
INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES ('e34dae18-abf3-421f-b706-540d82c6ff61', '2025-11-25T09:12:39.078Z', '2025-11-25T09:12:39.078Z', 'pushy footrest Course 3 — Module 3 — Lesson 3: cotidie ait depereo', 'Vitium alias veritatis curvo videlicet.', 'text', 'pushy footrest Course 3 — Module 3 — Lesson 3: cotidie ait depereo

Strues tenax crastinus sumptus apparatus adulescens. Bellicus illum conculco volaticus tamisium votum curvo. Aut comptus cubo vado synagoga torrens degenero.

Curso bibo tollo creta. Tum sumo vereor tenetur debilito adipiscor. Contra consectetur uxor.
Approbo demulceo creber vociferor. Condico porro allatus vapulus aer quaerat cinis conicio. Thema somniculosus ustulo arceo vitae optio.
Unus aranea adinventitias unde verumtamen tametsi pauper tutamen tantillus. Alo vinculum cogito sustineo solum. Tamisium dapifer suppellex cuius defluo cohibeo tactus vox doloribus aurum.

```js
console.log("Example 27");
```

Perferendis caput tristis totam. Quia curatio tam. Officiis velociter terminatio alii sono.', NULL, NULL, 11, 2, true, '{"courseId":"06bf6c25-2495-4d4a-a8d6-acbbc3b3ed90","courseTitle":"pushy footrest Course 3","moduleId":"7cf25fdd-8e52-448e-8d92-92bbede39e4a","moduleTitle":"pushy footrest Course 3 — Module 3","type":"text","tags":["basics","examples"],"embedding":null,"lessonId":"e34dae18-abf3-421f-b706-540d82c6ff61"}', '7cf25fdd-8e52-448e-8d92-92bbede39e4a');
