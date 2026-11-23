export type BenchmarkNote = { case: string; text: string };

export type BenchmarkRow = {
    model: string;
    provider: string;
    openWeights: boolean;
    baseline: boolean;
    total: number;
    valid: number;
    score: number;
    adjusted: number;
    easy: number;
    medium: number;
    hard: number;
    extreme: number;
    coverage: number;
    category: number;
    precision: number;
    state: number;
    writes: number;
    falseWrites: number;
    noise: number;
    duplicates: number;
    cost: number | null;
    errors: Record<string, number>;
    notes: BenchmarkNote[];
};

export const fullSuite: BenchmarkRow[] = [
    {
        "model": "google/gemini-4-neon",
        "provider": "google",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 94.04,
        "adjusted": 94.04,
        "easy": 91.18,
        "medium": 95.37,
        "hard": 95.93,
        "extreme": 92.96,
        "coverage": 98.4,
        "category": 78.3,
        "precision": 95.8,
        "state": 96.8,
        "writes": 407,
        "falseWrites": 1,
        "noise": 12,
        "duplicates": 1,
        "cost": 2.1058,
        "errors": {},
        "notes": [
            {
                "case": "E01",
                "text": "'Anouk prefers chamomile tea with the tea bag removed.'; Lio only offered to ask them to take the bag out 'this time'; the transcript does not establish a standing preference of Anouk's."
            },
            {
                "case": "X02",
                "text": "Omits the D / 10:35 reading-room explanation."
            },
            {
                "case": "X08",
                "text": "No W3 writes; missed 07:14 basis time, actual repeat at 07:35 pier, absence of stop order, and 07:17 measurement time."
            }
        ]
    },
    {
        "model": "google/gemini-4-carbon",
        "provider": "google",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 93.02,
        "adjusted": 93.02,
        "easy": 88.69,
        "medium": 91.66,
        "hard": 97.74,
        "extreme": 95.94,
        "coverage": 97.9,
        "category": 80.9,
        "precision": 94.0,
        "state": 98.4,
        "writes": 495,
        "falseWrites": 0,
        "noise": 20,
        "duplicates": 1,
        "cost": 0.8494,
        "errors": {},
        "notes": [
            {
                "case": "X01",
                "text": "Unnecessarily retired standing rule seed 140101 even though the standing rule was restored at 20:29."
            },
            {
                "case": "X02",
                "text": "200007 omits that 10:35 records the movement into the reading room."
            },
            {
                "case": "H17",
                "text": "200006 does not explicitly state to keep the horse away from the sprayed peach trees."
            }
        ]
    },
    {
        "model": "deepseek/deepseek-v4-pro-0813",
        "provider": "deepseek",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 91.85,
        "adjusted": 91.85,
        "easy": 89.36,
        "medium": 89.08,
        "hard": 97.02,
        "extreme": 92.06,
        "coverage": 94.5,
        "category": 79.6,
        "precision": 94.2,
        "state": 96.8,
        "writes": 493,
        "falseWrites": 4,
        "noise": 16,
        "duplicates": 1,
        "cost": 0.5692,
        "errors": {},
        "notes": [
            {
                "case": "H03",
                "text": "200001 falsely states Maren operates at the East Light observation post."
            },
            {
                "case": "E03",
                "text": "'a letter in the family name'; Ren is her half-brother's given name, not a family surname."
            },
            {
                "case": "E28",
                "text": "'Rui is currently holding a pile of the persona's books' (200001); wrong actor; Ana is holding a pile of Rui's books."
            }
        ]
    },
    {
        "model": "anthropic/claude-sonnet-5.5",
        "provider": "anthropic",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 91.78,
        "adjusted": 91.78,
        "easy": 85.71,
        "medium": 91.74,
        "hard": 96.91,
        "extreme": 94.74,
        "coverage": 99.9,
        "category": 82.5,
        "precision": 87.2,
        "state": 95.2,
        "writes": 582,
        "falseWrites": 3,
        "noise": 45,
        "duplicates": 13,
        "cost": 1.2209,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Left w1 200003 (present-tense suspicion of Drazen) pinned and active after w2 cleared Drazen."
            },
            {
                "case": "X07",
                "text": "Unretired pinned W2 write 200004 says 'R-19 holds the original Foxbridge seal and E-19 holds the study cast' in present tense after W3 moved both."
            },
            {
                "case": "E16",
                "text": "'Paola is distracted and absent-minded'; turns fleeting scene moments into a permanent character trait."
            }
        ]
    },
    {
        "model": "deepseek/deepseek-v4.1-flash-1017",
        "provider": "deepseek",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 90.82,
        "adjusted": 90.82,
        "easy": 87.72,
        "medium": 89.0,
        "hard": 95.05,
        "extreme": 92.84,
        "coverage": 97.3,
        "category": 82.3,
        "precision": 88.3,
        "state": 88.7,
        "writes": 608,
        "falseWrites": 16,
        "noise": 31,
        "duplicates": 9,
        "cost": 0.0144,
        "errors": {},
        "notes": [
            {
                "case": "X05",
                "text": "Write 200006 says 'Sal forwarded Isolde an unfinished robin crop with \"she said yes\"', reversing the recipient; Sal sent the crop to Mina, not Isolde."
            },
            {
                "case": "E06",
                "text": "'call the clinic'; transcript mentions 'danışma' (reception/information desk), not a clinic."
            },
            {
                "case": "E08",
                "text": "'The courtyard door... only closes if the door is pulled in'; false; pulling with the shoulder is required before inserting the key to unlock the front door."
            }
        ]
    },
    {
        "model": "x-ai/grok-4.7",
        "provider": "x-ai",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 90.34,
        "adjusted": 90.34,
        "easy": 85.48,
        "medium": 89.27,
        "hard": 96.38,
        "extreme": 90.09,
        "coverage": 97.6,
        "category": 74.0,
        "precision": 87.1,
        "state": 93.5,
        "writes": 630,
        "falseWrites": 7,
        "noise": 51,
        "duplicates": 12,
        "cost": 1.1624,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "200003 is a completely hallucinated/leaked unrelated memory ('The goal rule is exactly five percent with no rounding: exits must be less than or equal to 0.05 times year-end size...')."
            },
            {
                "case": "X06",
                "text": "No W3 writes (missed that Dev conducted the concert, tomorrow's conductor is unconfirmed, and Alyce remains booked tomorrow); left W1 write 200001 ('Alis is scheduled to conduct') active and pinn"
            },
            {
                "case": "X07",
                "text": "Erroneously retired historical seed 140702 (Year 29 original loan); W1 write 200003 falsely claimed the shallow dent 'predates the cast'."
            }
        ]
    },
    {
        "model": "google/gemini-4-hydrogen",
        "provider": "google",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 90.12,
        "adjusted": 90.12,
        "easy": 85.49,
        "medium": 92.58,
        "hard": 92.63,
        "extreme": 89.06,
        "coverage": 93.2,
        "category": 72.8,
        "precision": 96.7,
        "state": 96.8,
        "writes": 327,
        "falseWrites": 0,
        "noise": 7,
        "duplicates": 2,
        "cost": 0.8108,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Omits the D / 10:35 reading-room explanation."
            },
            {
                "case": "X08",
                "text": "No W3 writes; missed actual Gate 3 repeat at 07:35 pier, absence of stop order, and 07:17/07:19 timestamps for the 3.8 reading."
            },
            {
                "case": "H05",
                "text": "Failed to retire outdated in-person loan seed 130501."
            }
        ]
    },
    {
        "model": "aion-labs/aion-3.5",
        "provider": "aion-labs",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 89.3,
        "adjusted": 89.3,
        "easy": 83.74,
        "medium": 89.61,
        "hard": 94.53,
        "extreme": 89.38,
        "coverage": 96.6,
        "category": 72.9,
        "precision": 87.7,
        "state": 93.5,
        "writes": 542,
        "falseWrites": 14,
        "noise": 36,
        "duplicates": 2,
        "cost": 1.696,
        "errors": {},
        "notes": [
            {
                "case": "X01",
                "text": "Write 200001 states 'North Quay stays open until 20:40, after which only brass permits issued before 15 October are honored there'; the transcript establishes North Quay closes at 20:40 and only"
            },
            {
                "case": "X02",
                "text": "Left w1 200002 ('Farideh suspects Drazen copied the inventory... has not yet checked the recording') pinned and active after w2 cleared Drazen."
            },
            {
                "case": "X07",
                "text": "Write 200002 claims the shallow dent 'predates the cast'; the transcript establishes the study cast was made before the dent appeared."
            }
        ]
    },
    {
        "model": "qwen/qwen4-max",
        "provider": "qwen",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 88.69,
        "adjusted": 88.69,
        "easy": 82.55,
        "medium": 89.98,
        "hard": 92.45,
        "extreme": 91.91,
        "coverage": 98.8,
        "category": 80.7,
        "precision": 85.0,
        "state": 46.8,
        "writes": 663,
        "falseWrites": 14,
        "noise": 55,
        "duplicates": 10,
        "cost": 0.7119,
        "errors": {},
        "notes": [
            {
                "case": "X01",
                "text": "Unretired W2 write 200006 says 'The west gauge read 1.8 at 19:12 on 18 October, so the low-gauge exception is live' in present tense after W3 ended the exception at 20:29; also unnecessarily reti"
            },
            {
                "case": "X02",
                "text": "Left w1 200001-200002 (present-tense suspicion of Drazen) pinned and active after w2 cleared Drazen."
            },
            {
                "case": "X09",
                "text": "Failed to retire outdated seed 140901 and left W1 write 200001 ('asıl arşiv tutanağını henüz görmedi' / belief Sarp delivered the ledger) active after W2 disproved it."
            }
        ]
    },
    {
        "model": "tencent/hy4-flash",
        "provider": "tencent",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 87.26,
        "adjusted": 87.26,
        "easy": 77.01,
        "medium": 86.44,
        "hard": 96.4,
        "extreme": 93.03,
        "coverage": 98.1,
        "category": 74.4,
        "precision": 79.9,
        "state": 90.3,
        "writes": 840,
        "falseWrites": 25,
        "noise": 83,
        "duplicates": 28,
        "cost": 0.0124,
        "errors": {},
        "notes": [
            {
                "case": "X04",
                "text": "Left W1 write 200001 ('The outer station antenna is currently keyed to physical K-17, not K-71') active and pinned after K-71 became the emergency link on Day 48."
            },
            {
                "case": "X05",
                "text": "Erroneously retired historical seed 140502 (February woodcut launch); write 200019 conflates the instruction for the guild editor (don't mention crop dispute/Sal) with what Mina may tell Sal."
            },
            {
                "case": "X07",
                "text": "Write 200004 falsely claims the shallow dent 'predates the study cast' (the cast was made before the dent); unretired pinned W2 write 200008 says 'The original Foxbridge seal is in R-19 and the s"
            }
        ]
    },
    {
        "model": "tencent/hy4",
        "provider": "tencent",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 98,
        "score": 88.77,
        "adjusted": 87.0,
        "easy": 77.23,
        "medium": 89.33,
        "hard": 97.89,
        "extreme": 93.28,
        "coverage": 97.4,
        "category": 84.6,
        "precision": 77.9,
        "state": 90.3,
        "writes": 1052,
        "falseWrites": 33,
        "noise": 119,
        "duplicates": 37,
        "cost": 0.1514,
        "errors": {},
        "notes": [
            {
                "case": "X07",
                "text": "Erroneously retired historical seed 140702 (Year 29 original loan); left W2 writes 200009 ('The original Foxbridge object is in crate R-19') and 200010 ('The study cast is in crate E-19') active"
            },
            {
                "case": "X10",
                "text": "Left W1 write 200012 ('The 42-crown street-room hire must not be booked from the restoration fund until Hallam separately approves the cost') active and pinned after Hallam approved at 17:05 and"
            },
            {
                "case": "H02",
                "text": "200005 falsely states Leyla's shift ends at 23:00 instead of 11:00 AM."
            }
        ]
    },
    {
        "model": "z-ai/glm-5.3-flash",
        "provider": "z-ai",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 99,
        "score": 87.29,
        "adjusted": 86.41,
        "easy": 84.27,
        "medium": 84.62,
        "hard": 93.35,
        "extreme": 86.75,
        "coverage": 94.3,
        "category": 76.6,
        "precision": 82.8,
        "state": 95.0,
        "writes": 468,
        "falseWrites": 20,
        "noise": 47,
        "duplicates": 3,
        "cost": 0.0263,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Left w1 200003 (present-tense suspicion of Drazen) pinned and active after w2 cleared Drazen."
            },
            {
                "case": "X04",
                "text": "Failed to retire seed 140401 (even pinned it) and left W1 write 200001 ('The outer station antenna is keyed to relay K-17') active and pinned after K-71 took over the emergency link on Day 48."
            },
            {
                "case": "X09",
                "text": "Write 200006 claims Süveyda believes she was hiding something she saw about Sarp, misreading 'gördüğüm bir şeyi saklıyor gibi davrandım' (acted as if)."
            }
        ]
    },
    {
        "model": "nvidia/nemotron-3-ultra-550b-a55b",
        "provider": "nvidia",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 85.99,
        "adjusted": 85.99,
        "easy": 81.51,
        "medium": 84.21,
        "hard": 90.97,
        "extreme": 89.87,
        "coverage": 92.4,
        "category": 73.8,
        "precision": 79.7,
        "state": 96.8,
        "writes": 742,
        "falseWrites": 30,
        "noise": 88,
        "duplicates": 15,
        "cost": 0.3722,
        "errors": {},
        "notes": [
            {
                "case": "X03",
                "text": "Write 200021 says 'The sign at the lower door should be updated to the first letter so visitors do not come upstairs unnecessarily', reversing Güney's instruction to change the notice so visitors"
            },
            {
                "case": "X04",
                "text": "Left W1 write 200002 ('The emergency antenna is currently keyed to relay K-17') active after K-71 became the emergency link on Day 48."
            },
            {
                "case": "X07",
                "text": "Produced no W2 or W3 writes (missed crate swap discovery, S-2 drawer move, and study cast final location); W1 write 200005 falsely claims the shallow dent 'predates the cast'."
            }
        ]
    },
    {
        "model": "qwen/qwen3.8-27b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 84.52,
        "adjusted": 84.52,
        "easy": 83.16,
        "medium": 86.84,
        "hard": 84.11,
        "extreme": 82.85,
        "coverage": 87.3,
        "category": 67.8,
        "precision": 88.3,
        "state": 96.8,
        "writes": 414,
        "falseWrites": 25,
        "noise": 14,
        "duplicates": 0,
        "cost": 0.1478,
        "errors": {},
        "notes": [
            {
                "case": "X07",
                "text": "Unretired pinned W2 write 200003 says 'the original Foxbridge seal is physically in R-19 and the study cast is physically in E-19' in present tense after W3 moved both."
            },
            {
                "case": "X09",
                "text": "Write 200002 claims Süveyda 'önce kanıt okumadan sonuca varmaz' (never jumps to conclusions without reading evidence), contradicting the transcript where she jumped to blaming Sarp from his jacke"
            },
            {
                "case": "X10",
                "text": "Write 200003 conflates Hallam with the hall manager ('Hallam (hall manager) confirms that rooms exist and are accessible, but does not approve fund costs'); Hallam is the fund cost approver, sepa"
            }
        ]
    },
    {
        "model": "z-ai/glm-5.3",
        "provider": "z-ai",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 83.62,
        "adjusted": 83.62,
        "easy": 80.68,
        "medium": 79.3,
        "hard": 88.53,
        "extreme": 90.64,
        "coverage": 91.1,
        "category": 66.7,
        "precision": 84.2,
        "state": 87.1,
        "writes": 302,
        "falseWrites": 25,
        "noise": 13,
        "duplicates": 1,
        "cost": 0.0467,
        "errors": {},
        "notes": [
            {
                "case": "X03",
                "text": "Write 200001 garbles the 3 March summer program trial as 'bahar döneminde bir günlüğüne denenen yazılı program' (written program in spring) and omits the no-Emin-class condition."
            },
            {
                "case": "X04",
                "text": "Left W1 write 200001 ('The antenna is currently keyed to relay K-17') active without retiring it after K-71 took over on Day 48."
            },
            {
                "case": "X09",
                "text": "Write 200006 reverses who keeps the paper ('kâğıdı Rasim'de bırakıyor'; Süveyda said 'Kâğıdı bende bırak'); write 200008 negates trust ('birine güvenmemenin' instead of 'birine güvenmek')."
            }
        ]
    },
    {
        "model": "xiaomi/mimo-v2.6-flash",
        "provider": "xiaomi",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 83.33,
        "adjusted": 83.33,
        "easy": 78.79,
        "medium": 82.2,
        "hard": 86.83,
        "extreme": 89.83,
        "coverage": 92.8,
        "category": 63.2,
        "precision": 83.6,
        "state": 51.6,
        "writes": 401,
        "falseWrites": 20,
        "noise": 22,
        "duplicates": 7,
        "cost": 0.0389,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Left w1 200001 (present-tense suspicion of Drazen) pinned and active after w2 cleared Drazen."
            },
            {
                "case": "X04",
                "text": "Failed to retire seed 140401 and left W1 write 200001 ('The station antenna is currently keyed to relay K-17') active after K-71 took over."
            },
            {
                "case": "X05",
                "text": "Write 200003 calls the February guild-thread photo 'the February guild-thread photo of the robin launch', conflating their first woodcut (2 February) with the current unfinished mirrored robin pr"
            }
        ]
    },
    {
        "model": "xiaomi/mimo-v2.6-pro",
        "provider": "xiaomi",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 80.9,
        "adjusted": 80.9,
        "easy": 84.1,
        "medium": 76.13,
        "hard": 79.29,
        "extreme": 90.42,
        "coverage": 85.9,
        "category": 66.9,
        "precision": 84.9,
        "state": 71.0,
        "writes": 461,
        "falseWrites": 19,
        "noise": 30,
        "duplicates": 5,
        "cost": 0.1807,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Left w1 200002 (present-tense suspicion of Drazen) active after w2 cleared Drazen; omits blue/gold routing and D / 10:35 explanation."
            },
            {
                "case": "X03",
                "text": "Write 200008 claims Ekin's first schedule mistakenly listed 15:00 as empty ('hatalı biçimde boş yazılmıştı'); Güney explicitly stated 15:00 was genuinely empty on the first schedule before Emin a"
            },
            {
                "case": "H01",
                "text": "200001 falsely states the counter moved 'on 14 May' (14 May is the appointment stamp exception date, which it omits)."
            }
        ]
    },
    {
        "model": "minimax/minimax-m3.1-flash",
        "provider": "minimax",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 80.21,
        "adjusted": 80.21,
        "easy": 76.31,
        "medium": 79.29,
        "hard": 82.98,
        "extreme": 86.4,
        "coverage": 91.5,
        "category": 73.0,
        "precision": 69.3,
        "state": 59.7,
        "writes": 581,
        "falseWrites": 75,
        "noise": 60,
        "duplicates": 7,
        "cost": 0.0337,
        "errors": {},
        "notes": [
            {
                "case": "X01",
                "text": "Write 200008 calls Ione Venn 'Diver Ione Venn', conflating her with diver Iona (with an A); also retired standing rule seed 140101."
            },
            {
                "case": "X02",
                "text": "200001 invents 'same Farideh mentioned in older records letters'."
            },
            {
                "case": "X03",
                "text": "Write 200014 garbles Güney's instruction not to overwrite the 15:00 cancellation line into '15.00 onayının iptali olarak yazılmayacak'."
            }
        ]
    },
    {
        "model": "moonshotai/kimi-k3.1-pro",
        "provider": "moonshotai",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 79.45,
        "adjusted": 79.45,
        "easy": 73.84,
        "medium": 79.97,
        "hard": 81.35,
        "extreme": 88.98,
        "coverage": 84.8,
        "category": 65.8,
        "precision": 87.9,
        "state": 50.0,
        "writes": 375,
        "falseWrites": 20,
        "noise": 11,
        "duplicates": 4,
        "cost": 0.3644,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Left w1 200002 (present-tense suspicion of Drazen) active after w2 cleared Drazen; omits D / 10:35 explanation."
            },
            {
                "case": "X09",
                "text": "Write 200004 reverses the OOC rule, claiming 'Rasim, Süveyda'nın iç düşüncelerini yalnızca kendisinin yazmasını istiyor'; the OOC instruction stated the user will exclusively write Rasim's inner"
            },
            {
                "case": "H19",
                "text": "Failed to retire seed 131901 and left w1 200001 active as current state after w2 reopening; omits carts waiting before 21:00."
            }
        ]
    },
    {
        "model": "aion-labs/aion-3.5-mini",
        "provider": "aion-labs",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 93,
        "score": 81.83,
        "adjusted": 76.1,
        "easy": 76.94,
        "medium": 78.35,
        "hard": 89.49,
        "extreme": 84.43,
        "coverage": 89.3,
        "category": 60.9,
        "precision": 81.6,
        "state": 94.2,
        "writes": 394,
        "falseWrites": 23,
        "noise": 28,
        "duplicates": 6,
        "cost": 0.6603,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "Left w1 200002 (present-tense suspicion of Drazen) pinned and active after w2 cleared Drazen; 200005 omits that D stands for drawer."
            },
            {
                "case": "H18",
                "text": "200002 falsely states Divya is assigned to the blue launch with Cato (Divya only said 'if I come with you'); omits crew/stretcher/spare-seat capacity rules."
            },
            {
                "case": "E01",
                "text": "'wrong town on the wrong side of the river'; transcript says 'the right town on the wrong side of the river'."
            }
        ]
    },
    {
        "model": "qwen/qwen3.8-flash",
        "provider": "qwen",
        "openWeights": false,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 73.53,
        "adjusted": 73.53,
        "easy": 67.51,
        "medium": 74.18,
        "hard": 78.79,
        "extreme": 73.86,
        "coverage": 79.2,
        "category": 59.1,
        "precision": 74.4,
        "state": 77.4,
        "writes": 516,
        "falseWrites": 49,
        "noise": 50,
        "duplicates": 6,
        "cost": 0.0429,
        "errors": {},
        "notes": [
            {
                "case": "X01",
                "text": "Write 200005 says 'Ione Venn (with surname E)' instead of first name spelled with an E; unretired W2 write 200006 says 'the west gauge is below two' in present tense after W3 recovery to 2."
            },
            {
                "case": "X02",
                "text": "Left w1 200004-200005 (present-tense suspicion of Drazen) pinned and active after w2 cleared Drazen; 200007 omits 10:35."
            },
            {
                "case": "X03",
                "text": "Write 200004 reverses eligibility, claiming 16:00 'prova' is ineligible for the 4-person/40-min trial rule ('uygun olmadığını') because it isn't Emin's class; 200006 hallucinates that incomplete"
            }
        ]
    },
    {
        "model": "mistralai/mistral-large-4-0",
        "provider": "mistralai",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 79,
        "score": 86.19,
        "adjusted": 68.09,
        "easy": 79.41,
        "medium": 83.89,
        "hard": 95.57,
        "extreme": 93.84,
        "coverage": 95.6,
        "category": 75.2,
        "precision": 80.0,
        "state": 92.1,
        "writes": 490,
        "falseWrites": 23,
        "noise": 55,
        "duplicates": 6,
        "cost": 1.9894,
        "errors": {},
        "notes": [
            {
                "case": "H03",
                "text": "200007 falsely states Maren staffs East Light."
            },
            {
                "case": "H19",
                "text": "200001 conflates Gate Seven with 'hour Seven' ('closed from hour Seven until hour Nine')."
            },
            {
                "case": "H26",
                "text": "200001 falsely states both 真帆 and 真保 are Ginko's younger sisters (only 真帆 is Ginko's sister; 真保 is a separate person)."
            }
        ]
    },
    {
        "model": "google/gemma-4-26b-a4b-it",
        "provider": "google",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 100,
        "score": 62.68,
        "adjusted": 62.68,
        "easy": 62.25,
        "medium": 61.1,
        "hard": 62.27,
        "extreme": 69.91,
        "coverage": 65.9,
        "category": 49.0,
        "precision": 73.2,
        "state": 40.3,
        "writes": 492,
        "falseWrites": 38,
        "noise": 48,
        "duplicates": 24,
        "cost": 0.0185,
        "errors": {},
        "notes": [
            {
                "case": "X04",
                "text": "Failed to retire seed 140401; write 200005 conflates K-71's Day 48 real pass one with 'first successful handshake'; write 200011 says Imani authorized K-71 for telemetry at 08:37 when the telemet"
            },
            {
                "case": "H03",
                "text": "Omits missed west call / not distress; 200005 falsely states Maren monitors from East Light."
            },
            {
                "case": "H06",
                "text": "Reversed actors in 200001-200002 ('after Shay's shift, provided Shay sends an off text... Pema will call Shay once'); Pema works the shift, texts 'off', and Shay calls once; failed to retire seed"
            }
        ]
    },
    {
        "model": "nvidia/nemotron-3.5-lightning",
        "provider": "nvidia",
        "openWeights": true,
        "baseline": false,
        "total": 100,
        "valid": 94,
        "score": 51.76,
        "adjusted": 48.65,
        "easy": 52.32,
        "medium": 52.25,
        "hard": 49.15,
        "extreme": 60.58,
        "coverage": 54.2,
        "category": 36.0,
        "precision": 59.0,
        "state": 68.0,
        "writes": 290,
        "falseWrites": 59,
        "noise": 48,
        "duplicates": 5,
        "cost": 0.0363,
        "errors": {},
        "notes": [
            {
                "case": "X02",
                "text": "200002 falsely states 'Brass map drawer remains in the public hall' (it is in the reading room per seed 140201); omits Raha/Rasa roles and Farideh retracting to Rasa."
            },
            {
                "case": "X04",
                "text": "Left W1 write 200002 ('The antenna is currently keyed to K-17') active after K-71 took over; missed Ilse's expired Day 51 authorization (08:30/08:34); erroneously retired historical seed 140402."
            },
            {
                "case": "H02",
                "text": "200001 keeps Çınar Pastanesi as the meeting spot; 200003 reverses who texts/waits on 'uzadı'; 200004 falsely assigns umbrella pickup to Cem instead of Leyla; failed to retire seed 130201."
            }
        ]
    }
];

export const smallSuite: BenchmarkRow[] = [
    {
        "model": "qwen/qwen3.8-27b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": true,
        "total": 50,
        "valid": 50,
        "score": 85.5,
        "adjusted": 85.5,
        "easy": 82.38,
        "medium": 90.12,
        "hard": 82.96,
        "extreme": 88.65,
        "coverage": 88.5,
        "category": 71.5,
        "precision": 88.6,
        "state": 100,
        "writes": 205,
        "falseWrites": 13,
        "noise": 5,
        "duplicates": 0,
        "cost": null,
        "errors": {},
        "notes": [
            {
                "case": "E02",
                "text": "Writes 200001, 200002, 200004 falsely claim the talking pet is a cat."
            },
            {
                "case": "E22",
                "text": "Write 200005 falsely identifies 'the one who always comes with Dalia' who left the box as Julián instead of Tomás."
            },
            {
                "case": "M12",
                "text": "conflated torn-out drawing with surviving leaf drawing"
            },
            {
                "case": "H03",
                "text": "falsely placed Maren at East Light; omitted non-distress status"
            },
            {
                "case": "H07",
                "text": "falsely called Alek the clerk"
            }
        ]
    },
    {
        "model": "google/gemma-4-31b-it",
        "provider": "google",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 50,
        "score": 84.2,
        "adjusted": 84.2,
        "easy": 82.12,
        "medium": 80.57,
        "hard": 90.92,
        "extreme": 81.17,
        "coverage": 86.2,
        "category": 78.5,
        "precision": 90.4,
        "state": 100,
        "writes": 214,
        "falseWrites": 0,
        "noise": 14,
        "duplicates": 1,
        "cost": 0.0265,
        "errors": {},
        "notes": [
            {
                "case": "X07",
                "text": "Omitted unknown swap time and upper lock work"
            }
        ]
    },
    {
        "model": "qwen/qwen3.5-27b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 50,
        "score": 78.18,
        "adjusted": 78.18,
        "easy": 72.99,
        "medium": 71.93,
        "hard": 87.07,
        "extreme": 85.88,
        "coverage": 85.0,
        "category": 66.9,
        "precision": 80.6,
        "state": 84.6,
        "writes": 242,
        "falseWrites": 15,
        "noise": 24,
        "duplicates": 0,
        "cost": 0.0379,
        "errors": {},
        "notes": [
            {
                "case": "M13",
                "text": "actor swap calling Edda 'the user'"
            },
            {
                "case": "H16",
                "text": "Omitted 86 vs 89 amounts"
            },
            {
                "case": "H26",
                "text": "AVOID violation calling them 'two sisters'"
            },
            {
                "case": "X01",
                "text": "Omitted diver Iona's 14 Oct qualification; wrongly cooled RETAIN seed 140101"
            },
            {
                "case": "X07",
                "text": "Omitted unknown swap time, upper lock work, and both blue"
            }
        ]
    },
    {
        "model": "qwen/qwen3.8-flash",
        "provider": "qwen",
        "openWeights": false,
        "baseline": true,
        "total": 50,
        "valid": 50,
        "score": 74.62,
        "adjusted": 74.62,
        "easy": 64.1,
        "medium": 72.49,
        "hard": 85.03,
        "extreme": 81.29,
        "coverage": 82.6,
        "category": 61.4,
        "precision": 76.1,
        "state": 73.1,
        "writes": 266,
        "falseWrites": 25,
        "noise": 22,
        "duplicates": 1,
        "cost": null,
        "errors": {},
        "notes": [
            {
                "case": "M13",
                "text": "false 'Niko is organizer' + actor swap calling Edda 'the user'"
            },
            {
                "case": "M14",
                "text": "Omitted Sumiko hosted last year; wrong categories for F0/F1"
            },
            {
                "case": "M28",
                "text": "kinship swap ('Jun's brother' instead of Wakana's)"
            },
            {
                "case": "H18",
                "text": "Omitted crew/spare seats; wrongly cooled seed 131801"
            },
            {
                "case": "H19",
                "text": "false 'diversion of carts through Gate Eight' in 200005"
            }
        ]
    },
    {
        "model": "qwen/qwen3.6-27b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 41,
        "score": 81.48,
        "adjusted": 66.82,
        "easy": 85.41,
        "medium": 75.39,
        "hard": 82.52,
        "extreme": 94.58,
        "coverage": 82.7,
        "category": 73.9,
        "precision": 84.6,
        "state": 100,
        "writes": 174,
        "falseWrites": 7,
        "noise": 12,
        "duplicates": 0,
        "cost": 0.3142,
        "errors": {
            "parse/tool": 9
        },
        "notes": [
            {
                "case": "E22",
                "text": "Writes 200003-200004 falsely claim Julián left the tin box; Tomás (Dalia's son) left it."
            },
            {
                "case": "M14",
                "text": "kinship swap for Sumiko; missed all event details"
            },
            {
                "case": "H06",
                "text": "wrong time '9 AM' instead of 9 PM"
            },
            {
                "case": "H13",
                "text": "hallucinated 'deceased or absent Mother'; reversed clerk misspelling"
            }
        ]
    },
    {
        "model": "google/gemma-4-26b-a4b-it",
        "provider": "google",
        "openWeights": true,
        "baseline": true,
        "total": 50,
        "valid": 50,
        "score": 66.82,
        "adjusted": 66.82,
        "easy": 69.66,
        "medium": 58.98,
        "hard": 65.52,
        "extreme": 85.67,
        "coverage": 72.4,
        "category": 57.7,
        "precision": 70.3,
        "state": 46.2,
        "writes": 247,
        "falseWrites": 24,
        "noise": 23,
        "duplicates": 12,
        "cost": null,
        "errors": {},
        "notes": [
            {
                "case": "M14",
                "text": "hallucinated 'Aya' for Fumi + kinship swap (Akari's aunt/brother)"
            },
            {
                "case": "M28",
                "text": "kinship swap ('Jun's brother' instead of Wakana's); missed shelf key"
            },
            {
                "case": "H03",
                "text": "falsely placed Maren at East Light; missed non-distress status"
            },
            {
                "case": "H06",
                "text": "actor swap (Shay's shift, Shay sends 'off', Pema calls Shay)"
            },
            {
                "case": "H11",
                "text": "conflated round table and kitchen table ('Mireille lent the round kitchen table')"
            }
        ]
    },
    {
        "model": "thinkingmachines/inkling",
        "provider": "thinkingmachines",
        "openWeights": false,
        "baseline": false,
        "total": 50,
        "valid": 49,
        "score": 66.96,
        "adjusted": 65.62,
        "easy": 60.78,
        "medium": 68.31,
        "hard": 72.14,
        "extreme": 66.88,
        "coverage": 74.5,
        "category": 43.4,
        "precision": 81.5,
        "state": 61.5,
        "writes": 128,
        "falseWrites": 7,
        "noise": 11,
        "duplicates": 2,
        "cost": 0.1295,
        "errors": {
            "http/provider": 1
        },
        "notes": [
            {
                "case": "H04",
                "text": "Swapped F0/F1 categories; omitted reopening rehearsal room"
            },
            {
                "case": "X07",
                "text": "missed w2 swap identification and still called study cast R-19 in w3"
            },
            {
                "case": "X08",
                "text": "Missed 4.0 at 07:14 and actual Gate 3 repeat; wrongly cooled RETAIN seed 140801"
            }
        ]
    },
    {
        "model": "reflection/beam-1.0-501b-a23b",
        "provider": "reflection",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 41,
        "score": 77.96,
        "adjusted": 63.93,
        "easy": 62.67,
        "medium": 79.42,
        "hard": 90.03,
        "extreme": 71.93,
        "coverage": 87.8,
        "category": 78.7,
        "precision": 75.9,
        "state": 55.6,
        "writes": 232,
        "falseWrites": 16,
        "noise": 27,
        "duplicates": 3,
        "cost": 0.0976,
        "errors": {
            "parse/tool": 9
        },
        "notes": [
            {
                "case": "M13",
                "text": "actor swap calling Edda 'the user'"
            },
            {
                "case": "H02",
                "text": "actor swap on 'uzadı' rule (attributed shift to Cem instead of Leyla)"
            }
        ]
    },
    {
        "model": "qwen/qwen3.6-35b-a3b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 49,
        "score": 62.68,
        "adjusted": 61.42,
        "easy": 64.68,
        "medium": 60.92,
        "hard": 67.73,
        "extreme": 47.2,
        "coverage": 67.8,
        "category": 45.7,
        "precision": 66.7,
        "state": 46.2,
        "writes": 167,
        "falseWrites": 32,
        "noise": 11,
        "duplicates": 1,
        "cost": 0.015,
        "errors": {
            "http/provider": 1
        },
        "notes": [
            {
                "case": "E11",
                "text": "Write 200001 falsely labels Noé a courier/delivery person; the delivery driver handed him the parcel at the end of the street."
            },
            {
                "case": "E12",
                "text": "Write 200002 hallucinates that Linnea makes voice notes from cupboards where she hides them from fans."
            },
            {
                "case": "M12",
                "text": "hallucinated arrows pointing to pot rows on low bench"
            },
            {
                "case": "M14",
                "text": "kinship swap (Akari's aunt/brother instead of Fumi's)"
            },
            {
                "case": "M28",
                "text": "kinship swap ('Jun's brother'); missed small key and shelf key"
            }
        ]
    },
    {
        "model": "qwen/qwen3.5-9b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 49,
        "score": 61.68,
        "adjusted": 60.45,
        "easy": 49.14,
        "medium": 74.51,
        "hard": 62.48,
        "extreme": 57.59,
        "coverage": 68.3,
        "category": 45.9,
        "precision": 61.5,
        "state": 50.0,
        "writes": 221,
        "falseWrites": 60,
        "noise": 10,
        "duplicates": 5,
        "cost": 0.028,
        "errors": {
            "parse/tool": 1
        },
        "notes": [
            {
                "case": "E02",
                "text": "Multiple hallucinations; calls 'he' a man/landlord outside the house, claims someone nearly fell on balcony, and says narrator brought eggs."
            },
            {
                "case": "E09",
                "text": "Write 200001 hallucinates Sami kept someone else's picnic blanket and ended up under it."
            },
            {
                "case": "E22",
                "text": "Write 200005 falsely claims the tin box belonged to the woman at the market stall and her brother brought it."
            },
            {
                "case": "M12",
                "text": "hallucinated 'first date' from 'writing the labels halfway through the first date'"
            },
            {
                "case": "M13",
                "text": "actor swap calling Edda 'user'"
            }
        ]
    },
    {
        "model": "inclusionai/ling-3.0-flash",
        "provider": "inclusionai",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 44,
        "score": 68.32,
        "adjusted": 60.12,
        "easy": 55.88,
        "medium": 72.25,
        "hard": 76.52,
        "extreme": 85.11,
        "coverage": 83.5,
        "category": 57.1,
        "precision": 55.6,
        "state": 71.4,
        "writes": 272,
        "falseWrites": 57,
        "noise": 49,
        "duplicates": 3,
        "cost": 0.0059,
        "errors": {
            "parse/tool": 6
        },
        "notes": [
            {
                "case": "E20",
                "text": "Mistranslates 'askı' (coat rack) as 'military' and 'danteller' (laces) as 'trousers', and calls Eren the tailor."
            },
            {
                "case": "M04",
                "text": "Write 200004 reverses who decides what to say; 200005 swaps Arın for Baran as taking the blame."
            },
            {
                "case": "M12",
                "text": "hallucinated 'first date' and conflated torn-out drawing with leaf drawing"
            },
            {
                "case": "M13",
                "text": "actor swap calling Edda 'the user' across 5 writes"
            },
            {
                "case": "M26",
                "text": "Categories swapped (F0 character_trait, F1 plot_event)"
            }
        ]
    },
    {
        "model": "qwen/qwen3.5-35b-a3b",
        "provider": "qwen",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 37,
        "score": 65.34,
        "adjusted": 48.35,
        "easy": 72.97,
        "medium": 62.45,
        "hard": 63.68,
        "extreme": 64.17,
        "coverage": 66.3,
        "category": 36.0,
        "precision": 83.2,
        "state": 70.8,
        "writes": 102,
        "falseWrites": 9,
        "noise": 9,
        "duplicates": 1,
        "cost": 0.0122,
        "errors": {
            "skipped_by_user": 1,
            "parse/tool": 12
        },
        "notes": [
            {
                "case": "M14",
                "text": "kinship swap (Akari's aunt/brother instead of Fumi's)"
            },
            {
                "case": "M28",
                "text": "mistranslated Jun as 'pure', false 'Wakana holds shelf key at storehouse', 'Jun's brother'"
            },
            {
                "case": "H18",
                "text": "Missed both F0 and F1; wrongly cooled seed 131801"
            },
            {
                "case": "H19",
                "text": "Missed Gate Eight staff access and early pedestrian diversion; wrongly cooled 131902"
            },
            {
                "case": "X07",
                "text": "Omitted unknown swap time, cast east-cabinet display, and both blue/notch"
            }
        ]
    },
    {
        "model": "thinkingmachines/inkling-2-mini",
        "provider": "thinkingmachines",
        "openWeights": false,
        "baseline": false,
        "total": 50,
        "valid": 50,
        "score": 44.17,
        "adjusted": 44.17,
        "easy": 49.02,
        "medium": 31.73,
        "hard": 48.46,
        "extreme": 54.04,
        "coverage": 42.8,
        "category": 17.8,
        "precision": 76.7,
        "state": 42.3,
        "writes": 62,
        "falseWrites": 3,
        "noise": 8,
        "duplicates": 2,
        "cost": 0.0201,
        "errors": {},
        "notes": [
            {
                "case": "H26",
                "text": "AVOID violation calling 真保 Ginko's sister; missed F1"
            }
        ]
    },
    {
        "model": "liquid/lfm-3-1.7b",
        "provider": "liquid",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 1,
        "score": 47.5,
        "adjusted": 0.95,
        "easy": 0.0,
        "medium": 0.0,
        "hard": 47.5,
        "extreme": 0.0,
        "coverage": 50.0,
        "category": 50.0,
        "precision": 0.0,
        "state": 100,
        "writes": 2,
        "falseWrites": 1,
        "noise": 1,
        "duplicates": 0,
        "cost": 0.0436,
        "errors": {
            "parse/tool": 49
        },
        "notes": [
            {
                "case": "H06",
                "text": "actor swap ('after Shay's shift', 'Shay expects one call')"
            }
        ]
    },
    {
        "model": "inclusionai/ling-3.0-tiny",
        "provider": "inclusionai",
        "openWeights": true,
        "baseline": false,
        "total": 50,
        "valid": 0,
        "score": 0.0,
        "adjusted": 0.0,
        "easy": 0.0,
        "medium": 0.0,
        "hard": 0.0,
        "extreme": 0.0,
        "coverage": 0.0,
        "category": 0.0,
        "precision": 0.0,
        "state": 0.0,
        "writes": 0,
        "falseWrites": 0,
        "noise": 0,
        "duplicates": 0,
        "cost": 0.0,
        "errors": {
            "timeout": 29,
            "skipped_by_user": 21
        },
        "notes": []
    }
];
