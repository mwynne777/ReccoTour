-- Up
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    selectedArtists TEXT,
    defaultSelectedArtists TEXT,
    dislikedArtists TEXT
);

INSERT INTO User (name, selectedArtists, defaultSelectedArtists, dislikedArtists) VALUES 
   ('mwynne777', '[{"genres":["electropop","indie pop","indie poptimism","indietronica","pop","post-teen pop"],"id":"5JMLG56F1X5mFmWNmS0iAp","images":[{"height":640,"url":"https://i.scdn.co/image/149c1ea6da304f25f13226679955e442237537a6","width":640},{"height":320,"url":"https://i.scdn.co/image/83e68a9a80ccc356786f162abdd13ccbf690336a","width":320},{"height":160,"url":"https://i.scdn.co/image/6946566ca74178fb39765f1c64fa241952636dd4","width":160}],"name":"Chelsea Cutler"}]',
            '[{"genres":["electropop","indie pop","indie poptimism","indietronica","pop","post-teen pop"],"id":"5JMLG56F1X5mFmWNmS0iAp","images":[{"height":640,"url":"https://i.scdn.co/image/149c1ea6da304f25f13226679955e442237537a6","width":640},{"height":320,"url":"https://i.scdn.co/image/83e68a9a80ccc356786f162abdd13ccbf690336a","width":320},{"height":160,"url":"https://i.scdn.co/image/6946566ca74178fb39765f1c64fa241952636dd4","width":160}],"name":"Chelsea Cutler"}]', '[]');

-- Down
DROP TABLE User;