import { useMemo } from 'react';

const teamAliasMap = {
  ACC: {
    'Syracuse Orange': 'SYR',
    'Boston College Eagles': 'BC',
    'Virginia Cavaliers': 'UVA',
    'Georgia Tech Yellow Jackets': 'GT',
    'Louisville Cardinals': 'LOU',
    'Miami (FL) Hurricanes': 'MFL',
    'Virginia Tech Hokies': 'VT',
    'North Carolina Tar Heels': 'NC',
    'Clemson Tigers': 'CLE',
    'Pittsburgh Panthers': 'PIT',
    'Duke Blue Devils': 'DUK',
    'California Golden Bears': 'CAL',
    'North Carolina State Wolfpack': 'NCST',
    'SMU Mustangs': 'SMU',
    'Stanford Cardinal': 'STA',
    'Wake Forest Demon Deacons': 'WF',
    'Florida State Seminoles': 'FSU',
    'Notre Dame Fighting Irish': 'ND',
  },
  SEC: {
    'South Carolina Gamecocks': 'SC',
    'Alabama Crimson Tide': 'BAMA',
    'Oklahoma Sooners': 'OKL',
    'Georgia Bulldogs': 'UGA',
    'Georgia Lady Bulldogs': 'UGA',
    'Missouri Tigers': 'MIZ',
    'Vanderbilt Commodores': 'VAN',
    'Ole Miss Rebels': 'MIS',
    'Arkansas Razorbacks': 'ARK',
    'Mississippi State Bulldogs': 'MSST',
    'Tennessee Volunteers': 'TEN',
    'Tennessee Lady Volunteers': 'TEN',
    'Texas Longhorns': 'TEX',
    'LSU Tigers': 'LSU',
    'Florida Gators': 'FLA',
    'Texas A&M Aggies': 'TXAM',
    'Auburn Tigers': 'AUB',
    'Kentucky Wildcats': 'KEN',
  },
};

const useStandings = (leagueData, leagueType, conf) => {
  const getRecord = (team, type) =>
    team?.records?.find(
      (record) => record?.record_type === type || record?.category === type,
    ) || { wins: 0, losses: 0, win_pct: 0 };

  const calculateGamesBehind = (confRecord, leadingConfRecord) =>
    (leadingConfRecord?.wins -
      confRecord?.wins +
      confRecord?.losses -
      leadingConfRecord?.losses) /
      2 || 0;

  const sortTeams = (teamA, teamB) =>
    teamA?.rank?.conference - teamB?.rank?.conference;

  const formatTeamStandings = (team, leadingTeam = null) => {
    const teamName = `${team?.market || ''} ${team?.name || ''}`.trim();
    const confRecord = getRecord(team, 'conference');
    const homeRecord = getRecord(team, 'home');
    const roadRecord = getRecord(team, 'road');

    const leadingConfRecord = leadingTeam
      ? getRecord(leadingTeam, 'conference')
      : null;

    const gamesBehind = leadingTeam
      ? calculateGamesBehind(confRecord, leadingConfRecord)
      : (team?.games_behind?.conference ?? 0);

    const gamesBehindFormatted = Number.isInteger(gamesBehind)
      ? gamesBehind
      : gamesBehind?.toFixed(1);

    const winPercentage =
      team?.wins === 0 && team?.losses === 0 ? 0.0 : team?.win_pct;

    return {
      name: teamName,
      alias: teamAliasMap?.[conf]?.[teamName],
      confRecord: `${confRecord?.wins ?? 0} - ${confRecord?.losses ?? 0}`,
      overallRecord: `${team?.wins ?? 0} - ${team?.losses ?? 0}`,
      winPercentage,
      home: `${homeRecord?.wins ?? 0} - ${homeRecord?.losses ?? 0}`,
      road: `${roadRecord?.wins ?? 0} - ${roadRecord?.losses ?? 0}`,
      gamesBehind: gamesBehindFormatted,
    };
  };

  return useMemo(() => {
    if (!leagueData || !leagueType || !conf) return [];

    const getFormattedTeams = (alias) => {
      const sortedTeams = leagueData?.conferences
        ?.find((conference) => conference?.alias === alias)
        ?.teams?.sort(sortTeams);
      const leadingTeam = sortedTeams?.[0];
      return sortedTeams?.map((team) => formatTeamStandings(team, leadingTeam));
    };

    const leagueTypeSuffix = leagueType === 'ncaawb' ? '-W' : '';
    const conferenceAlias =
      leagueType === 'ncaafb' ? conf : `${conf}${leagueTypeSuffix}`;

    if (leagueType === 'ncaafb') {
      const sortedTeams = leagueData?.divisions
        ?.find((division) => division?.alias === 'FBS')
        ?.conferences?.find(
          (conference) => conference?.alias === conferenceAlias,
        )
        ?.teams?.sort(sortTeams);
      const leadingTeam = sortedTeams?.[0];

      return sortedTeams?.map((team) => formatTeamStandings(team, leadingTeam));
    }

    return getFormattedTeams(conferenceAlias);
  }, [leagueData, leagueType, conf]);
};

export default useStandings;
