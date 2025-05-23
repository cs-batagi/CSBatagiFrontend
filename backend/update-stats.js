// API-based stats generator for CS:GO stats
// This script connects to your database via API endpoint, runs queries, and generates JSON files
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// API endpoint configuration
const API_ENDPOINT = 'https://db2.csbatagi.com/execute-query';
const MW_TOKEN = process.env.MW_TOKEN;

// Define the SQL select clause to be used in queries
const selectClause = `
          AVG(p1.hltv_rating_2) AS HLTV_2,
          AVG(p1.average_damage_per_round) AS adr,
          AVG(p1.kill_count) AS KILLS,
          AVG(p1.death_count) AS DEATHS,
          AVG(p1.assist_count) AS ASSISTS,
          AVG(p1.kill_death_ratio) AS KD,
          AVG(p1.headshot_count) AS Headshot_kills,
          AVG(p1.headshot_percentage) AS Headshot_killratio,
 This is not enough. I think we should move all the business logic functionality to the backend. undo you changes and start over. Everything rein the scripts folder should be moved to backend          AVG(p1.first_kill_count) AS first_kill_count,
          AVG(p1.first_death_count) AS first_death_count,
          AVG(p1.bomb_planted_count) AS bomb_planted,
          AVG(p1.bomb_defused_count) AS bomb_defused,
          AVG(p1.hltv_rating) AS HLTV,
          AVG(p1.mvp_count) AS MVP,
          AVG(p1.kast) AS KAST,
          AVG(p1.utility_damage) AS UTL_DMG,
          AVG(p1.two_kill_count) AS two_kills,
          AVG(p1.three_kill_count) AS three_kills,
          AVG(p1.four_kill_count) AS four_kills,
          AVG(p1.five_kill_count) AS five_kills,
          AVG(p1.score) AS SCORE,
          `;

// Season start date (can be passed as environment variable or hardcoded)
const sezonbaslangic = process.env.SEZON_BASLANGIC || '2025-02-10';

// SQL Queries
const queries = {
  // Query for season_avg.json - retrieves overall season stats
  seasonAvg: `
         WITH match_date_info AS (
            SELECT MAX(matches.date::date) AS latest_match_date 
            FROM matches
        ),
        season_start_info AS (
            SELECT '${sezonbaslangic}'::date AS seasonstart
        ),
        match_agg AS (
            SELECT
              p1.steam_id,
              MAX(p1.name) AS name,
              ${selectClause}
              (SELECT latest_match_date FROM match_date_info) AS latest_match_date,
              COUNT(*) AS matches_in_interval,
              COUNT(CASE WHEN matches.winner_name = p1.team_name THEN 1 END) AS win_count,
              ROUND(
                  (COUNT(CASE WHEN matches.winner_name = p1.team_name THEN 1 END)::numeric 
                  / COUNT(*) * 100)
                  , 2
              ) AS win_rate_percentage
            FROM players AS p1
            INNER JOIN matches ON p1.match_checksum = matches.checksum
            WHERE 
                matches.date::date BETWEEN 
                    (SELECT seasonstart FROM season_start_info) 
                    AND 
                    (SELECT latest_match_date FROM match_date_info)
            GROUP BY p1.steam_id
        ),
        clutch_agg AS (
            SELECT
              c.clutcher_steam_id AS steam_id,
              COUNT(*)::numeric AS total_clutches,
              COUNT(CASE WHEN c.won = TRUE THEN 1 END)::numeric AS total_clutches_won
            FROM clutches c
            JOIN matches m ON c.match_checksum = m.checksum
            WHERE m.date::date BETWEEN 
                    (SELECT seasonstart FROM season_start_info) 
                    AND 
                    (SELECT latest_match_date FROM match_date_info)
            GROUP BY c.clutcher_steam_id
        )
        SELECT
          m.*,
          ROUND(coalesce(c.total_clutches, 0) / m.matches_in_interval, 2) AS avg_clutches,
          ROUND(coalesce(c.total_clutches_won, 0) / m.matches_in_interval, 2) AS avg_clutches_won,
          CASE 
            WHEN coalesce(c.total_clutches, 0) = 0 THEN 0
            ELSE ROUND(c.total_clutches_won / c.total_clutches * 100, 2)
          END AS successful_clutch_percentage
        FROM match_agg m
        LEFT JOIN clutch_agg c ON m.steam_id = c.steam_id
        ORDER BY HLTV_2 DESC;
  `,
};

const executeStatsUpdate = async () => {
  try {
    console.log('Starting stats update...');

    // Example: Fetch data for season average stats
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MW_TOKEN}`,
      },
      body: JSON.stringify({ query: queries.seasonAvg }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch season average stats: ${response.statusText}`);
    }

    const data = await response.json();

    // Write the data to a JSON file
    const outputPath = path.join(__dirname, 'data', 'season_avg.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log('Stats update completed successfully.');
  } catch (error) {
    console.error('Error during stats update:', error);
    throw error;
  }
};

module.exports = { executeStatsUpdate, queries, API_ENDPOINT, MW_TOKEN, sezonbaslangic, selectClause };
