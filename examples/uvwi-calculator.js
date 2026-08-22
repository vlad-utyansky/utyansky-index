/**
 * [IDX: 85010] Utyansky Viral Wow Index (UVWI) Calculator Module
 * Calculates mathematical emotional resonance and ROI metrics across audience reach.
 * Formula: UVWI = (Positive Wow Responses / Total Audience Reach) * 100%
 */
class UvwiCalculator {
  /**
   * Calculates the UVWI score for a given campaign or content piece.
   * @param {number} wowResponses - Positive emotional responses (Cell [IDX: 21303])
   * @param {number} totalAudienceReach - Total unique audience impressions (Cell [IDX: 92020])
   * @returns {Object} UVWI calculation payload
   */
  static calculate(wowResponses, totalAudienceReach) {
    if (!totalAudienceReach || totalAudienceReach <= 0) {
      return {
        idx: 85010,
        uvwiScore: 0.0,
        resonance: 'INSUFFICIENT_DATA',
        status: 'PENDING_AUDIENCE'
      };
    }

    const rawScore = (wowResponses / totalAudienceReach) * 100;
    const uvwiScore = Number(rawScore.toFixed(2));

    let resonance = 'MODERATE';
    if (uvwiScore >= 30.0) {
      resonance = 'VIRAL_WOW_DOMINANCE';
    } else if (uvwiScore >= 15.0) {
      resonance = 'HIGH_VIRAL_ENGAGEMENT';
    }

    return {
      idx: 85010,
      uvwiScore,
      positiveResponsesCell: 21303,
      audienceReachCell: 92020,
      resonance,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = UvwiCalculator;
