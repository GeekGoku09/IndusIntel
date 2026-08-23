import { IndustrialProduct } from '../types';

export const SAMPLE_INDUSTRIAL_PRODUCTS: IndustrialProduct[] = [
  {
    id: 'prod-001',
    sku: 'PKR-P1D-050-0100',
    mpn: 'P1D-S050MS-0100',
    manufacturer: 'Parker Hannifin',
    productName: 'P1D Standard Profile Pneumatic Cylinder',
    series: 'P1D Series ISO 15552',
    sector: 'Fluid Power & Pneumatics',
    category: 'Pneumatic Actuators',
    unspscCode: '40141600',
    unspscTitle: 'Pneumatic cylinders and actuators',
    etimClassCode: 'EC011283',
    etimClassVersion: '9.0',
    etimClassTitle: 'Pneumatic cylinder with profile tube',
    eclassCode: '27-29-20-01',
    shortDescription: '50mm bore, 100mm stroke ISO 15552 profile pneumatic cylinder with magnetic piston, adjustable cushioning, and stainless steel rod.',
    marketingSummary: 'The Parker P1D Series delivers heavy-duty linear motion conforming strictly to ISO 15552 / ISO 6431. Featuring polyurethane self-lubricating seal technology, integrated magnetic sensing slots, and optimized pneumatic cushioning for long cycle lifetimes in industrial packaging and robotic tooling.',
    bulletPoints: [
      'Standardized mounting geometry to ISO 15552 with drop-in global interchangeability',
      'Magnetic piston for flush-mount reed and solid-state hall-effect position sensors',
      'Dual adjustable pneumatic end-position cushions with lockable needle screws',
      'Corrosion-resistant anodized aluminium profile barrel and 316 stainless steel tie-rods'
    ],
    applications: ['Automated Packaging Machinery', 'Robotic Pick & Place Fixtures', 'Conveyor Transfer Gates', 'Automotive Assembly Lines'],
    cadModelAvailable: true,
    datasheetUrl: 'https://datasheets.parker.com/p1d-iso15552.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    rawInputSnippet: 'Parker P1D-S050MS-0100, 50mm bore x 100mm stroke, 10 bar max, ISO 15552 profile cyl, mag piston, G 1/4 ports, NBR seals, -20C to 80C',
    sourceType: 'RAW_TEXT',
    overallConfidence: 96,
    completenessScore: 94,
    dataQualityScore: 98,
    reviewStatus: 'AUTO_APPROVED',
    createdAt: '2026-08-19T10:15:00Z',
    updatedAt: '2026-08-21T11:30:00Z',
    modelCodeBreakdown: [
      { segment: 'P1D', meaning: 'Series Family', decodedValue: 'ISO 15552 Profile Pneumatic Cylinder' },
      { segment: 'S', meaning: 'Version', decodedValue: 'Standard Profile with Sensor Grooves' },
      { segment: '050', meaning: 'Piston Bore', decodedValue: '50 mm Diameter' },
      { segment: 'MS', meaning: 'Piston / Rod Option', decodedValue: 'Magnetic Piston + Stainless Steel Rod' },
      { segment: '0100', meaning: 'Stroke Length', decodedValue: '100 mm Linear Travel' }
    ],
    specs: [
      {
        key: 'bore_size',
        label: 'Piston Bore Diameter',
        category: 'Mechanical',
        rawValue: '50mm',
        normalizedValue: 50,
        unit: 'mm',
        imperialValue: '1.968 in',
        tolerance: '±0.05 mm',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF008123',
        status: 'valid',
        evidence: {
          attributeKey: 'bore_size',
          sourceText: '50mm bore',
          sourceLocation: 'Model Code Segment "050" & Raw Description',
          evidenceType: 'MODEL_NOMENCLATURE_DECODE',
          confidence: 0.99,
          reasoning: 'Extracted from raw text "50mm bore" and verified against Parker P1D naming schema 050 = 50mm.'
        }
      },
      {
        key: 'stroke_length',
        label: 'Stroke Length',
        category: 'Mechanical',
        rawValue: '100mm',
        normalizedValue: 100,
        unit: 'mm',
        imperialValue: '3.937 in',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF008124',
        status: 'valid',
        evidence: {
          attributeKey: 'stroke_length',
          sourceText: '100mm stroke',
          sourceLocation: 'Model Code Segment "0100"',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.99,
          reasoning: 'Directly specified in product description and standard stroke suffix 0100.'
        }
      },
      {
        key: 'max_operating_pressure',
        label: 'Max Operating Pressure',
        category: 'Performance',
        rawValue: '10 bar',
        normalizedValue: 10,
        unit: 'bar',
        imperialValue: '145.04 psi',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF002391',
        status: 'valid',
        evidence: {
          attributeKey: 'max_operating_pressure',
          sourceText: '10 bar max',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'UNIT_NORMALIZED',
          confidence: 0.98,
          reasoning: 'Extracted 10 bar, normalized to 145.04 PSI dual rating per standard pneumatic calculation.'
        }
      },
      {
        key: 'port_connection',
        label: 'Pneumatic Port Size',
        category: 'Dimensions',
        rawValue: 'G 1/4',
        normalizedValue: 'G 1/4 (BSPP)',
        unit: 'thread',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001209',
        status: 'valid',
        evidence: {
          attributeKey: 'port_connection',
          sourceText: 'G 1/4 ports',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.95,
          reasoning: 'ISO 15552 standard 50mm bore default pneumatic port is G 1/4.'
        }
      },
      {
        key: 'operating_temperature',
        label: 'Operating Temperature Range',
        category: 'Environmental',
        rawValue: '-20C to 80C',
        normalizedValue: '-20 to +80',
        unit: '°C',
        imperialValue: '-4°F to 176°F',
        isKeyCommerceFilter: false,
        etimFeatureCode: 'EF000137',
        status: 'valid',
        evidence: {
          attributeKey: 'operating_temperature',
          sourceText: '-20C to 80C',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'UNIT_NORMALIZED',
          confidence: 0.96,
          reasoning: 'Normalized Celsius range with dual Fahrenheit commercial conversion.'
        }
      },
      {
        key: 'cushioning_type',
        label: 'End Cushioning',
        category: 'Performance',
        rawValue: 'Adjustable pneumatic',
        normalizedValue: 'PPV (Adjustable both ends)',
        unit: 'type',
        isKeyCommerceFilter: false,
        etimFeatureCode: 'EF008129',
        status: 'inferred',
        evidence: {
          attributeKey: 'cushioning_type',
          sourceText: 'ISO 15552 profile cyl',
          sourceLocation: 'ISO 15552 Specification Standard',
          evidenceType: 'INDUSTRY_STANDARD_DEFAULT',
          confidence: 0.92,
          reasoning: 'Inferred PPV adjustable pneumatic cushioning standard on Parker P1D profile series.'
        }
      }
    ],
    standardsCertifications: ['ISO 15552', 'DIN ISO 6431', 'RoHS 3 (EU 2015/863)', 'CE Machinery Directive 2006/42/EC'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: true,
      ipRating: 'IP67 (Seals)',
      atexRating: 'II 2GD c T4 (with optional ATEX seal kit)'
    },
    crossReferences: [
      {
        brand: 'Festo',
        mpn: 'DSBC-50-100-PPVA-N3',
        series: 'DSBC ISO 15552',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 98,
        notes: 'Identical 50mm bore, 100mm stroke, G 1/4 ports, and ISO 15552 foot/flange pattern.',
        keyDeltas: ['Festo uses PPS self-adjusting cushion; Parker uses manual needle screw.']
      },
      {
        brand: 'SMC Pneumatics',
        mpn: 'CP96SDB50-100C',
        series: 'CP96 Series',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 96,
        notes: 'Direct physical drop-in with identical mounting centers and stroke.',
        keyDeltas: ['SMC auto-switch track fits D-M9 series sensors; Parker uses P8S sensors.']
      },
      {
        brand: 'Aventics (Emerson)',
        mpn: 'PRA-DA-050-0100-0-2',
        series: 'PRA Series ISO 15552',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 95,
        notes: 'Fully compliant ISO 15552 dimensions and 10 bar pressure rating.',
        keyDeltas: ['Aventics offers hygiene clean profile variant.']
      }
    ],
    accessoriesAndSpares: [
      {
        type: 'SENSOR_SWITCH',
        name: 'P8S Reed Magnetic Proximity Sensor',
        partNumber: 'P8S-GRFLX',
        compatibilityType: 'Recommended',
        description: 'Flush T-slot mounting magnetic sensor with 3m PUR cable and LED indicator.'
      },
      {
        type: 'MOUNTING',
        name: 'Foot Mounting Bracket (Pair)',
        partNumber: 'P1D-4KMB',
        compatibilityType: 'Optional Replacement',
        description: 'Cast iron foot bracket conforming to ISO 15552 standard mounting holes.'
      },
      {
        type: 'SEAL_KIT',
        name: 'Standard NBR Piston & Rod Seal Overhaul Kit',
        partNumber: 'P1D-9NBR-050',
        compatibilityType: 'Required',
        description: 'Complete replacement seals for 50mm bore cylinder maintenance.'
      }
    ],
    validationIssues: [],
    auditTrail: [
      {
        attributeKey: 'ISO_COMPLIANCE',
        evidenceType: 'DIRECT_EXTRACT',
        confidence: 0.99,
        reasoning: 'Verified ISO 15552 geometric compliance matches catalog profile standard.'
      },
      {
        attributeKey: 'UNSPSC_CLASSIFICATION',
        evidenceType: 'CROSS_REFERENCED',
        confidence: 0.97,
        reasoning: 'Classified under UNSPSC 40141600 (Pneumatic cylinders and actuators).'
      }
    ]
  },
  {
    id: 'prod-002',
    sku: 'GDF-CR3-15-A-A-A-E-HQQE',
    mpn: 'CR 3-15 A-A-A-E-HQQE',
    manufacturer: 'Grundfos',
    productName: 'CR Vertical Multistage Centrifugal Pump',
    series: 'CR 3 Multi-Stage',
    sector: 'Pumps & Fluid Handling',
    category: 'Centrifugal Process Pumps',
    unspscCode: '40151503',
    unspscTitle: 'Centrifugal pumps',
    etimClassCode: 'EC010051',
    etimClassVersion: '9.0',
    etimClassTitle: 'Multistage centrifugal pump',
    eclassCode: '36-41-01-01',
    shortDescription: 'Vertical multistage centrifugal pump, 3 m³/h nominal flow, 15 impellers, 1.5 kW 3-phase IE3 motor, 25 bar PN 25 rating, AISI 304 stainless steel.',
    marketingSummary: 'The Grundfos CR 3-15 is the global benchmark for vertical multistage in-line pumps. Engineered for pressure boosting, industrial liquid transfer, reverse osmosis, boiler feed, and process cooling with class-leading hydraulic efficiency and durable tungsten carbide mechanical seals.',
    bulletPoints: [
      'High-efficiency IE3 premium 3-phase induction motor (1.5 kW / 2.0 HP)',
      '15-stage laser-welded AISI 304 stainless steel impeller assembly',
      'Cartridge mechanical shaft seal (HQQE SiC/SiC/EPDM) replaceable without dismantling',
      'In-line DIN oval / Victorian flange connections for compact skid installations'
    ],
    applications: ['Boiler Feed Water Systems', 'Industrial Pressure Boosting', 'Reverse Osmosis Filtration', 'CIP (Clean-in-Place) Rinsing', 'District Heating & HVAC Loops'],
    cadModelAvailable: true,
    datasheetUrl: 'https://product-selection.grundfos.com/cr-3-15.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    rawInputSnippet: 'Grundfos CR 3-15 pump, 1.5kW 3x400V 50Hz, 3 m3/h Q_nom, H_max 75m, PN25 oval flange, HQQE seal, max temp 120 deg C',
    sourceType: 'RAW_TEXT',
    overallConfidence: 94,
    completenessScore: 91,
    dataQualityScore: 92,
    reviewStatus: 'VERIFIED_READY',
    createdAt: '2026-08-18T14:20:00Z',
    updatedAt: '2026-08-20T16:00:00Z',
    modelCodeBreakdown: [
      { segment: 'CR', meaning: 'Pump Type', decodedValue: 'Vertical Multistage In-line Centrifugal Pump' },
      { segment: '3', meaning: 'Nominal Flow Rate', decodedValue: '3 m³/h (13.2 GPM)' },
      { segment: '15', meaning: 'Number of Impellers / Stages', decodedValue: '15 Stage Hydraulic Assembly' },
      { segment: 'A', meaning: 'Pipe Connection', decodedValue: 'Oval Flange with Internal Thread' },
      { segment: 'A', meaning: 'Material Execution', decodedValue: 'Standard Cast Iron Base / AISI 304 Wetted Parts' },
      { segment: 'HQQE', meaning: 'Shaft Seal Code', decodedValue: 'Cartridge Seal: SiC / SiC / EPDM' }
    ],
    specs: [
      {
        key: 'nominal_flow_rate',
        label: 'Nominal Flow Rate (Q)',
        category: 'Performance',
        rawValue: '3 m3/h',
        normalizedValue: 3,
        unit: 'm³/h',
        imperialValue: '13.21 GPM',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001892',
        status: 'valid',
        evidence: {
          attributeKey: 'nominal_flow_rate',
          sourceText: '3 m3/h Q_nom',
          sourceLocation: 'Model Code "3" & Raw Input',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.98,
          reasoning: 'Extracted from pump model designation CR 3 and raw text.'
        }
      },
      {
        key: 'motor_power',
        label: 'Motor Rated Power',
        category: 'Electrical',
        rawValue: '1.5kW',
        normalizedValue: 1.5,
        unit: 'kW',
        imperialValue: '2.01 HP',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000035',
        status: 'valid',
        evidence: {
          attributeKey: 'motor_power',
          sourceText: '1.5kW',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'UNIT_NORMALIZED',
          confidence: 0.99,
          reasoning: 'Normalized to 1.5 kW (2.0 HP dual display).'
        }
      },
      {
        key: 'max_head',
        label: 'Maximum Head (H)',
        category: 'Performance',
        rawValue: '75m',
        normalizedValue: 75,
        unit: 'm',
        imperialValue: '246.06 ft',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001893',
        status: 'valid',
        evidence: {
          attributeKey: 'max_head',
          sourceText: 'H_max 75m',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.97,
          reasoning: 'Extracted 75m hydraulic head limit.'
        }
      },
      {
        key: 'liquid_temp_max',
        label: 'Maximum Liquid Temperature',
        category: 'Environmental',
        rawValue: '120 deg C',
        normalizedValue: 120,
        unit: '°C',
        imperialValue: '248 °F',
        isKeyCommerceFilter: false,
        etimFeatureCode: 'EF001897',
        status: 'valid',
        evidence: {
          attributeKey: 'liquid_temp_max',
          sourceText: 'max temp 120 deg C',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'UNIT_NORMALIZED',
          confidence: 0.95,
          reasoning: 'Matches Grundfos HQQE seal high-temp EPDM elastomer rating.'
        }
      }
    ],
    standardsCertifications: ['ISO 9906:2012 Grade 3B', 'IE3 Premium Efficiency IEC 60034-30-1', 'CE', 'WRAS Drinking Water Approved', 'ACS Water Attestation'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: true,
      ipRating: 'IP55 (Motor Terminal Box)',
      ulListing: 'UL 778 / CSA 22.2 No 108'
    },
    crossReferences: [
      {
        brand: 'Wilo',
        mpn: 'Helix V 415-1/16/E/S/400-50',
        series: 'Helix V Series',
        matchType: 'FUNCTIONAL_EQUIVALENT',
        compatibilityScore: 93,
        notes: 'High-efficiency vertical multistage pump with equivalent 1.5kW motor and 70-80m head range.',
        keyDeltas: ['Wilo Helix V has slightly different port face-to-face dimensions (check piping alignment).']
      },
      {
        brand: 'KSB',
        mpn: 'Movitec V 03/15 B',
        series: 'Movitec V',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 95,
        notes: 'Direct in-line replacement with matching DIN flange centers.',
        keyDeltas: ['KSB mechanical seal uses Burgmann MG1 cartridge.']
      }
    ],
    accessoriesAndSpares: [
      {
        type: 'SEAL_KIT',
        name: 'HQQE Cartridge Mechanical Shaft Seal',
        partNumber: '96511840',
        compatibilityType: 'Required',
        description: 'Original Grundfos 12mm silicon carbide / silicon carbide cartridge seal kit.'
      },
      {
        type: 'VALVE_MANIFOLD',
        name: 'Oval Counter Flange Set (1" BSPP)',
        partNumber: '00370001',
        compatibilityType: 'Recommended',
        description: 'Pair of cast iron threaded companion flanges with EPDM gaskets and bolts.'
      }
    ],
    validationIssues: [],
    auditTrail: [
      {
        attributeKey: 'ETIM_ENRICHMENT',
        evidenceType: 'CROSS_REFERENCED',
        confidence: 0.98,
        reasoning: 'Mapped to ETIM Class EC010051 (Multistage centrifugal pump).'
      }
    ]
  },
  {
    id: 'prod-003',
    sku: 'SIE-6SL3210-1KE18-8UF1',
    mpn: '6SL3210-1KE18-8UF1',
    manufacturer: 'Siemens',
    productName: 'SINAMICS G120C Compact Frequency Inverter',
    series: 'SINAMICS G120C Frame Size FSB',
    sector: 'Motors & Automation Drives',
    category: 'Variable Frequency Drives (VFD)',
    unspscCode: '39122001',
    unspscTitle: 'Variable frequency drives',
    etimClassCode: 'EC001857',
    etimClassVersion: '9.0',
    etimClassTitle: 'Frequency converter <= 1 kV',
    eclassCode: '27-02-31-01',
    shortDescription: '3-phase 380-480V VFD, 4.0 kW (5.0 HP) heavy duty rating, integrated PROFINET / EtherNet/IP, STO SIL 3 / PL e safety, Frame Size FSB.',
    marketingSummary: 'The Siemens SINAMICS G120C is designed for machinery OEMs needing a compact, power-dense variable speed drive with integrated safety and industrial Ethernet communications. Features Vector Control without encoder, built-in braking chopper, and certified Safe Torque Off (STO).',
    bulletPoints: [
      'Rated Power: 4.0 kW (5.0 HP) with 150% overload for 60 seconds (Heavy Duty)',
      'Dual-port PROFINET IO / EtherNet/IP for seamless TIA Portal and third-party PLC integration',
      'Certified Safe Torque Off (STO) to SIL 3 / PL e according to IEC 61508 / ISO 13849',
      'Side-by-side book-size mounting without thermal derating up to 40°C'
    ],
    applications: ['Conveyor Sorting Systems', 'Packaging Machines', 'Industrial Extruders & Mixers', 'Pumping Stations', 'HVAC Air Handlers'],
    cadModelAvailable: true,
    datasheetUrl: 'https://support.industry.siemens.com/cs/document/6sl3210-1ke18-8uf1.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    rawInputSnippet: 'Siemens G120C 6SL3210-1KE18-8UF1 4kW 3AC 380-480V PROFINET STO SIL3 IP20 FSB drive',
    sourceType: 'RAW_TEXT',
    overallConfidence: 97,
    completenessScore: 96,
    dataQualityScore: 99,
    reviewStatus: 'AUTO_APPROVED',
    createdAt: '2026-08-17T09:00:00Z',
    updatedAt: '2026-08-21T08:00:00Z',
    modelCodeBreakdown: [
      { segment: '6SL3210', meaning: 'Drive Family', decodedValue: 'SINAMICS G120C Inverter' },
      { segment: '1KE', meaning: 'Voltage & Filter', decodedValue: '3AC 380-480V Unfiltered' },
      { segment: '18-8', meaning: 'Current Rating', decodedValue: '8.8 A Rated Output Current (4.0 kW)' },
      { segment: 'U', meaning: 'Braking Chopper', decodedValue: 'Integrated Braking Resistor Chopper' },
      { segment: 'F1', meaning: 'Communication Bus', decodedValue: 'PROFINET / EtherNet/IP' }
    ],
    specs: [
      {
        key: 'rated_power_kw',
        label: 'Rated Power Output',
        category: 'Electrical',
        rawValue: '4kW',
        normalizedValue: 4.0,
        unit: 'kW',
        imperialValue: '5.36 HP',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000035',
        status: 'valid',
        evidence: {
          attributeKey: 'rated_power_kw',
          sourceText: '4kW',
          sourceLocation: 'Raw Snippet & Model Code 18-8',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.99,
          reasoning: 'Explicitly stated 4kW.'
        }
      },
      {
        key: 'supply_voltage',
        label: 'Supply Voltage Range',
        category: 'Electrical',
        rawValue: '3AC 380-480V',
        normalizedValue: '380 - 480',
        unit: 'V AC',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001858',
        status: 'valid',
        evidence: {
          attributeKey: 'supply_voltage',
          sourceText: '3AC 380-480V',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.98,
          reasoning: '3-phase 380-480V nominal line supply.'
        }
      },
      {
        key: 'fieldbus_protocol',
        label: 'Fieldbus Protocol',
        category: 'Electrical',
        rawValue: 'PROFINET',
        normalizedValue: 'PROFINET IO / EtherNet/IP',
        unit: 'protocol',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000067',
        status: 'valid',
        evidence: {
          attributeKey: 'fieldbus_protocol',
          sourceText: 'PROFINET',
          sourceLocation: 'Raw Snippet & Model Suffix "F1"',
          evidenceType: 'MODEL_NOMENCLATURE_DECODE',
          confidence: 0.99,
          reasoning: 'Decoded F1 suffix indicates dual PROFINET/EtherNet/IP interface.'
        }
      },
      {
        key: 'functional_safety',
        label: 'Functional Safety Level',
        category: 'Standards',
        rawValue: 'STO SIL3',
        normalizedValue: 'Safe Torque Off (SIL 3 / PL e)',
        unit: 'safety',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF007890',
        status: 'valid',
        evidence: {
          attributeKey: 'functional_safety',
          sourceText: 'STO SIL3',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.98,
          reasoning: 'TÜV certified Safe Torque Off integrated.'
        }
      }
    ],
    standardsCertifications: ['IEC 61800-5-1', 'IEC 61508 SIL 3', 'ISO 13849-1 Cat 4 PL e', 'UL 508C', 'CE', 'cULus Listed', 'RCM'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: true,
      ipRating: 'IP20',
      ulListing: 'E121068 UL508C'
    },
    crossReferences: [
      {
        brand: 'ABB',
        mpn: 'ACS380-040S-09A4-4',
        series: 'ACS380 Machinery Drive',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 96,
        notes: '4.0kW 380-480V machinery drive with integrated STO and Ethernet/IP / Profinet options.',
        keyDeltas: ['ABB uses assistant control panel; Siemens uses BOP-2 or Smart Access Module.']
      },
      {
        brand: 'Schneider Electric',
        mpn: 'ATV320U40N4B',
        series: 'Altivar Machine ATV320',
        matchType: 'FUNCTIONAL_EQUIVALENT',
        compatibilityScore: 94,
        notes: 'Book-style 4.0kW drive with embedded safety and dual RJ45 ports.',
        keyDeltas: ['Schneider requires separate communication card for native Profinet.']
      }
    ],
    accessoriesAndSpares: [
      {
        type: 'CONNECTOR',
        name: 'BOP-2 Basic Operator Panel',
        partNumber: '6SL3255-0AA00-4CA1',
        compatibilityType: 'Recommended',
        description: 'Snap-on 2-line LCD keypad for drive parameterization and diagnostics.'
      },
      {
        type: 'VALVE_MANIFOLD',
        name: 'Braking Resistor 150 Ohm 100W',
        partNumber: '6SL3201-0BE14-3AA0',
        compatibilityType: 'Optional Replacement',
        description: 'External dynamic braking resistor for rapid deceleration cycles.'
      }
    ],
    validationIssues: [],
    auditTrail: []
  },
  {
    id: 'prod-004',
    sku: 'FST-539218-VUVS',
    mpn: 'VUVS-L25-M52-MD-G14-F8',
    manufacturer: 'Festo',
    productName: 'VUVS Universal Directional Control Solenoid Valve',
    series: 'VUVS-L Series',
    sector: 'Fluid Power & Pneumatics',
    category: 'Solenoid Process Valves',
    unspscCode: '40141603',
    unspscTitle: 'Pneumatic solenoid valves',
    etimClassCode: 'EC010467',
    etimClassVersion: '9.0',
    etimClassTitle: 'Directional control valve',
    eclassCode: '27-29-10-01',
    shortDescription: '5/2-way single solenoid pneumatic valve, 1000 l/min flow rate, G 1/4 port, 24V DC pilot, 2.5 - 10 bar operating pressure, mechanical spring reset.',
    marketingSummary: 'Festo VUVS is the rugged workhorse solenoid valve designed for harsh industrial automation environments. Boasting high flow rates in an ultra-compact footprint with IP65 electrical connection and reversible armatures for flexible manifold or in-line sub-base mounting.',
    bulletPoints: [
      '5/2-way monostable configuration with pneumatic pilot and mechanical spring return',
      'High nominal flow rate of 1000 L/min for fast cylinder cycle times',
      'Robust die-cast aluminium housing with IP65 protection rating',
      'Push-in manual override (non-detenting and detenting)'
    ],
    applications: ['Actuator Cylinder Control', 'Pneumatic Automation Cells', 'Material Handling Diverters', 'Packaging Seal Bars'],
    cadModelAvailable: true,
    datasheetUrl: 'https://www.festo.com/datasheets/vuvs-l25.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
    rawInputSnippet: 'Festo valve VUVS-L25-M52-MD-G14-F8, 5/2 way, single sol 24VDC, G1/4, 1000 l/min, mechanical spring, 2.5-10 bar',
    sourceType: 'RAW_TEXT',
    overallConfidence: 98,
    completenessScore: 97,
    dataQualityScore: 99,
    reviewStatus: 'AUTO_APPROVED',
    createdAt: '2026-08-16T11:00:00Z',
    updatedAt: '2026-08-20T14:15:00Z',
    modelCodeBreakdown: [
      { segment: 'VUVS-L25', meaning: 'Valve Size & Type', decodedValue: 'Size 25 In-Line Directional Solenoid Valve' },
      { segment: 'M52', meaning: 'Valve Function', decodedValue: '5/2-Way Monostable (Single Solenoid)' },
      { segment: 'MD', meaning: 'Reset Mechanism', decodedValue: 'Pneumatic Spring with Mechanical Auxiliary Spring' },
      { segment: 'G14', meaning: 'Pneumatic Connection', decodedValue: 'G 1/4 (BSPP) Threaded Ports' },
      { segment: 'F8', meaning: 'Coil Armature Size', decodedValue: 'Standard 8mm Armature Tube for VACS Coil' }
    ],
    specs: [
      {
        key: 'valve_function',
        label: 'Valve Function',
        category: 'Mechanical',
        rawValue: '5/2 way',
        normalizedValue: '5/2-Way Monostable',
        unit: 'function',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001201',
        status: 'valid',
        evidence: {
          attributeKey: 'valve_function',
          sourceText: '5/2 way',
          sourceLocation: 'Model Code M52 & Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.99,
          reasoning: 'Extracted 5/2 monostable directional valve.'
        }
      },
      {
        key: 'nominal_flow_rate',
        label: 'Standard Nominal Flow Rate (qn)',
        category: 'Performance',
        rawValue: '1000 l/min',
        normalizedValue: 1000,
        unit: 'l/min',
        imperialValue: '35.31 CFM',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001892',
        status: 'valid',
        evidence: {
          attributeKey: 'nominal_flow_rate',
          sourceText: '1000 l/min',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'UNIT_NORMALIZED',
          confidence: 0.98,
          reasoning: 'Standard pneumatic flow rate normalized to 1000 L/min (35.31 CFM).'
        }
      },
      {
        key: 'coil_voltage',
        label: 'Nominal Actuation Voltage',
        category: 'Electrical',
        rawValue: '24VDC',
        normalizedValue: 24,
        unit: 'V DC',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000037',
        status: 'valid',
        evidence: {
          attributeKey: 'coil_voltage',
          sourceText: '24VDC',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.99,
          reasoning: '24V DC solenoid operation.'
        }
      }
    ],
    standardsCertifications: ['ISO 19973-2', 'RoHS 3', 'CE', 'cULus Recognized'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: true,
      ipRating: 'IP65 (with connector plug)'
    },
    crossReferences: [
      {
        brand: 'SMC',
        mpn: 'SY5120-5G-01',
        series: 'SY5000 Series',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 96,
        notes: '5/2 monostable 24VDC valve with 1/8 to 1/4 port options and high cycle life.',
        keyDeltas: ['SMC power consumption is lower (0.35W vs Festo 1.0W).']
      },
      {
        brand: 'Parker',
        mpn: 'P2V-BV511EE',
        series: 'Viking Lite Series',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 94,
        notes: 'Direct equivalent 5/2 G 1/4 industrial solenoid valve.',
        keyDeltas: ['Parker uses 22mm DIN industrial standard coil.']
      }
    ],
    accessoriesAndSpares: [
      {
        type: 'CONNECTOR',
        name: 'VACS-C-C1-1A Solenoid Coil 24V DC',
        partNumber: '8025331',
        compatibilityType: 'Required',
        description: '24V DC plug-in solenoid coil with Form C industrial connector.'
      },
      {
        type: 'CONNECTOR',
        name: 'MSSD-EB Form C Angled Plug Socket',
        partNumber: '151687',
        compatibilityType: 'Recommended',
        description: 'IP65 Hirschmann style cable socket with LED switching indicator.'
      }
    ],
    validationIssues: [],
    auditTrail: []
  },
  {
    id: 'prod-005',
    sku: 'SKF-FY-50-TF',
    mpn: 'FY 50 TF',
    manufacturer: 'SKF',
    productName: 'Square Flanged Ball Bearing Unit',
    series: 'Y-Bearing Flange Units (FY Series)',
    sector: 'Bearings & Power Transmission',
    category: 'Mounted Bearing Units',
    unspscCode: '31171501',
    unspscTitle: 'Ball bearings and pillow blocks',
    etimClassCode: 'EC000456',
    etimClassVersion: '9.0',
    etimClassTitle: 'Bearing housing unit complete',
    eclassCode: '23-05-08-01',
    shortDescription: '50mm shaft diameter, 4-bolt square cast iron flange unit with set screw locking, relubrication nipple, and contact seal with flinger.',
    marketingSummary: 'SKF FY 50 TF square flanged ball bearing units are engineered for robust performance in industrial conveyors, agricultural equipment, and packaging lines. Features high-grade grey cast iron housing, spherical outer ring insert for misalignment compensation, and patented multi-lip seals.',
    bulletPoints: [
      '50mm metric bore insert bearing with dual Grub set screw shaft lock',
      'Rigid 4-bolt square flange cast iron housing (EN-GJL-HB195)',
      'Relubrication grease zerk fitting positioned at 45 degrees for easy servicing',
      'Dynamic load rating 35.1 kN / Static load rating 23.2 kN'
    ],
    applications: ['Belt & Roller Conveyors', 'Bulk Material Elevators', 'Industrial Fans & Blowers', 'Agricultural Harvesters'],
    cadModelAvailable: true,
    datasheetUrl: 'https://www.skf.com/group/products/mounted-bearings/ball-bearing-units/fy-50-tf',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80',
    rawInputSnippet: 'SKF FY 50 TF bearing, 50mm bore, 4 bolt square flange, cast iron, grub screw lock, C=35.1kN, C0=23.2kN',
    sourceType: 'RAW_TEXT',
    overallConfidence: 96,
    completenessScore: 92,
    dataQualityScore: 95,
    reviewStatus: 'AUTO_APPROVED',
    createdAt: '2026-08-15T08:30:00Z',
    updatedAt: '2026-08-19T13:40:00Z',
    modelCodeBreakdown: [
      { segment: 'FY', meaning: 'Housing Style', decodedValue: '4-Bolt Square Flange Cast Iron Housing' },
      { segment: '50', meaning: 'Shaft Diameter', decodedValue: '50 mm Metric Shaft Bore' },
      { segment: 'TF', meaning: 'Insert Bearing Type', decodedValue: 'YAR 210-2F Insert with Grub Set Screw Locking & Contact Seals' }
    ],
    specs: [
      {
        key: 'shaft_diameter',
        label: 'Shaft Diameter (d)',
        category: 'Dimensions',
        rawValue: '50mm',
        normalizedValue: 50,
        unit: 'mm',
        imperialValue: '1.9685 in',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000008',
        status: 'valid',
        evidence: {
          attributeKey: 'shaft_diameter',
          sourceText: '50mm bore',
          sourceLocation: 'Model Code "50" & Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.99,
          reasoning: 'Extracted 50mm shaft diameter.'
        }
      },
      {
        key: 'dynamic_load_rating',
        label: 'Basic Dynamic Load Rating (C)',
        category: 'Performance',
        rawValue: '35.1kN',
        normalizedValue: 35.1,
        unit: 'kN',
        imperialValue: '7,890 lbf',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF001899',
        status: 'valid',
        evidence: {
          attributeKey: 'dynamic_load_rating',
          sourceText: 'C=35.1kN',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.98,
          reasoning: 'ISO 281 standard dynamic load capacity.'
        }
      },
      {
        key: 'housing_material',
        label: 'Housing Material',
        category: 'Materials',
        rawValue: 'cast iron',
        normalizedValue: 'Grey Cast Iron (EN-GJL-200)',
        unit: 'grade',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF002167',
        status: 'valid',
        evidence: {
          attributeKey: 'housing_material',
          sourceText: 'cast iron',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.97,
          reasoning: 'Standard grey cast iron housing construction.'
        }
      }
    ],
    standardsCertifications: ['ISO 3228', 'DIN 626-1', 'RoHS 3 Compliant', 'REACH'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: false,
      ipRating: 'IP65 (with optional end covers)'
    },
    crossReferences: [
      {
        brand: 'Timken',
        mpn: 'RCJ 50',
        series: 'RCJ Series 4-Bolt Flange',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 98,
        notes: 'Identical 50mm shaft bore, 143mm square flange dimensions and bolt hole centers.',
        keyDeltas: ['Timken uses eccentric locking collar vs SKF dual set screw.']
      },
      {
        brand: 'INA / Schaeffler',
        mpn: 'PCF50',
        series: 'PCF Cast Iron Housing Units',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 97,
        notes: 'Direct 4-bolt interchange conforming to DIN ISO flange standards.',
        keyDeltas: ['INA uses Corrotect anti-corrosion coating option.']
      },
      {
        brand: 'NSK',
        mpn: 'UCF210D1',
        series: 'UCF 200 Series',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 99,
        notes: 'JIS standard 50mm 4-bolt square flange matching ISO envelope.',
        keyDeltas: ['Identical set screw locking mechanism.']
      }
    ],
    accessoriesAndSpares: [
      {
        type: 'SEAL_KIT',
        name: 'ECY 210 End Cover Cap',
        partNumber: 'ECY-210',
        compatibilityType: 'Recommended',
        description: 'Snap-in thermoplastic end cover protection for shaft ends.'
      },
      {
        type: 'MOUNTING',
        name: 'YAR 210-2F Replacement Insert Bearing',
        partNumber: 'YAR-210-2F',
        compatibilityType: 'Required',
        description: 'Original SKF 50mm wide inner ring insert bearing.'
      }
    ],
    validationIssues: [],
    auditTrail: []
  },
  {
    id: 'prod-006',
    sku: 'EH-PROMAG-10P-50',
    mpn: '10P50-AA0A1AA0A4AA',
    manufacturer: 'Endress+Hauser',
    productName: 'Proline Promag 10P Electromagnetic Flowmeter',
    series: 'Promag P Industrial High Temp',
    sector: 'Sensors & Industrial IoT',
    category: 'Flow Sensors & Instrumentation',
    unspscCode: '41112501',
    unspscTitle: 'Liquid flowmeters',
    etimClassCode: 'EC010214',
    etimClassVersion: '9.0',
    etimClassTitle: 'Flow measurement device',
    eclassCode: '27-20-04-01',
    shortDescription: 'DN50 (2") electromagnetic flowmeter for conductive liquids, PTFE liner, Hastelloy C-22 electrodes, 4-20mA HART / Pulse output, PN40 flange.',
    marketingSummary: 'The Promag 10P is engineered for chemical, water, and corrosive process applications with aggressive fluids and high media temperatures up to 180°C. Delivers ±0.5% reading accuracy independent of fluid viscosity, density, and flow profile.',
    bulletPoints: [
      'DN 50 (2 inch) nominal diameter with EN 1092-1 PN40 raised face flanges',
      'Vacuum-resistant virgin PTFE liner suitable for strong acids and alkalis',
      'Measuring accuracy ±0.5% o.r. ± 1 mm/s with bidirectional flow sensing',
      'Simultaneous 4-20mA HART active/passive current loop and scalable frequency/pulse outputs'
    ],
    applications: ['Chemical Dosing & Batching', 'Wastewater Treatment Plants', 'Acid & Caustic Fluid Transfer', 'Industrial Effluent Monitoring'],
    cadModelAvailable: true,
    datasheetUrl: 'https://www.endress.com/promag-10p.pdf',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    rawInputSnippet: 'Endress+Hauser Promag 10P DN50 2inch magnetic flow meter, PTFE liner, Hastelloy C22, 4-20mA HART, PN40 flange, 24VDC, -40 to 180C',
    sourceType: 'RAW_TEXT',
    overallConfidence: 97,
    completenessScore: 95,
    dataQualityScore: 98,
    reviewStatus: 'AUTO_APPROVED',
    createdAt: '2026-08-14T15:10:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
    modelCodeBreakdown: [
      { segment: '10P', meaning: 'Transmitter / Sensor Series', decodedValue: 'Promag 10 Basic Transmitter with Promag P Sensor' },
      { segment: '50', meaning: 'Nominal Diameter', decodedValue: 'DN 50 (2 Inch) Pipe Size' },
      { segment: 'AA0A1', meaning: 'Liner & Electrode Material', decodedValue: 'PTFE Liner + Alloy C-22 Electrodes' },
      { segment: 'AA', meaning: 'Process Connection', decodedValue: 'EN 1092-1 (DIN 2501) PN40 Flange' }
    ],
    specs: [
      {
        key: 'pipe_diameter_dn',
        label: 'Nominal Pipe Size (DN)',
        category: 'Dimensions',
        rawValue: 'DN50',
        normalizedValue: 50,
        unit: 'DN (mm)',
        imperialValue: '2.0 in ANSI',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000008',
        status: 'valid',
        evidence: {
          attributeKey: 'pipe_diameter_dn',
          sourceText: 'DN50 2inch',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.99,
          reasoning: 'DN50 / 2-inch standard pipe bore.'
        }
      },
      {
        key: 'liner_material',
        label: 'Wetted Liner Material',
        category: 'Materials',
        rawValue: 'PTFE',
        normalizedValue: 'Virgin PTFE (Polytetrafluoroethylene)',
        unit: 'material',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF002167',
        status: 'valid',
        evidence: {
          attributeKey: 'liner_material',
          sourceText: 'PTFE liner',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.98,
          reasoning: 'Chemically inert PTFE liner for harsh process fluids.'
        }
      },
      {
        key: 'analog_output',
        label: 'Output Signal Protocol',
        category: 'Electrical',
        rawValue: '4-20mA HART',
        normalizedValue: '4-20 mA HART + Frequency / Pulse',
        unit: 'signal',
        isKeyCommerceFilter: true,
        etimFeatureCode: 'EF000067',
        status: 'valid',
        evidence: {
          attributeKey: 'analog_output',
          sourceText: '4-20mA HART',
          sourceLocation: 'Raw Snippet',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.98,
          reasoning: 'HART protocol 4-20mA current loop.'
        }
      }
    ],
    standardsCertifications: ['OIML R49', 'NAMUR NE 21 / NE 43', 'ATEX II 2G Ex d', 'RoHS 3', 'CE', 'FM / CSA Class I Div 2'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: true,
      ipRating: 'IP67 / NEMA 4X',
      atexRating: 'ATEX II 2G Ex d ia IIC T6'
    },
    crossReferences: [
      {
        brand: 'KROHNE',
        mpn: 'OPTIFLUX 4100 C DN50',
        series: 'OPTIFLUX 4000',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 97,
        notes: 'High-performance electromagnetic flowmeter with identical PTFE wetted liner and DIN PN40 face-to-face dimensions.',
        keyDeltas: ['KROHNE uses virtual reference grounding electrode.']
      },
      {
        brand: 'Yokogawa',
        mpn: 'AXG050-GA000NE11-1AA11',
        series: 'ADMAG AXG',
        matchType: 'DIRECT_DROP_IN',
        compatibilityScore: 96,
        notes: 'Direct interchange DN50 magmeter with dual-frequency excitation and HART 7.',
        keyDeltas: ['Yokogawa electrode adhesion diagnostic available.']
      }
    ],
    accessoriesAndSpares: [
      {
        type: 'CONNECTOR',
        name: 'Grounding Ring Set DN50 (Alloy C-22)',
        partNumber: 'DK5GD-50',
        compatibilityType: 'Required',
        description: 'Pair of grounding disk rings for unlined/plastic piping potential equalization.'
      }
    ],
    validationIssues: [],
    auditTrail: []
  },
  {
    id: 'prod-007',
    sku: 'FLG-CONFLICT-TEST-007',
    mpn: 'HPBV-200-SS-NBR-300C',
    manufacturer: 'FlowGuard Process Valves',
    productName: 'High Pressure 3-Piece Flanged Ball Valve [Conflict Flagged]',
    series: 'HPBV Severe Service Series',
    sector: 'Process Valves & Actuation',
    category: 'Industrial Ball Valves',
    unspscCode: '40141607',
    unspscTitle: 'Ball valves',
    etimClassCode: 'EC010150',
    etimClassVersion: '9.0',
    etimClassTitle: 'Ball valve',
    shortDescription: '2-inch Class 600 full port stainless steel ball valve with conflicting raw thermal rating.',
    marketingSummary: 'Severe service ball valve with flagged engineering conflict: input sheet claims 300°C steam rating with standard NBR nitrile elastomeric seat (which degrades above 100°C). Needs Human-in-the-Loop review.',
    bulletPoints: [
      '2" (DN50) full port 3-piece bolted 316SS body construction',
      'Class 600 (100 bar / 1480 psi) rated pressure boundary',
      'ISO 5211 direct mount actuator top flange'
    ],
    applications: ['Petrochemical Refineries', 'High Pressure Gas Pipelines'],
    cadModelAvailable: false,
    rawInputSnippet: 'FlowGuard HPBV-200-SS-NBR 2" Class 600 ball valve 316SS body, NBR seals, rated for 300C superheated steam, 100 bar pressure',
    sourceType: 'RAW_TEXT',
    overallConfidence: 68,
    completenessScore: 78,
    dataQualityScore: 62,
    reviewStatus: 'FLAGGED_CONFLICT',
    createdAt: '2026-08-20T12:00:00Z',
    updatedAt: '2026-08-21T13:10:00Z',
    specs: [
      {
        key: 'valve_size',
        label: 'Nominal Valve Size',
        category: 'Dimensions',
        rawValue: '2"',
        normalizedValue: 50,
        unit: 'mm / 2"',
        isKeyCommerceFilter: true,
        status: 'valid'
      },
      {
        key: 'max_temperature',
        label: 'Max Operating Temperature',
        category: 'Environmental',
        rawValue: '300C',
        normalizedValue: 300,
        unit: '°C',
        imperialValue: '572 °F',
        isKeyCommerceFilter: true,
        status: 'warning',
        warningMessage: 'Conflict: NBR seal elastomer material has safe continuous thermal ceiling of 100°C (120°C peak). Claim of 300°C requires metal-to-metal or Grafoil/PEEK seat.',
        evidence: {
          attributeKey: 'max_temperature',
          sourceText: 'rated for 300C superheated steam',
          evidenceType: 'DIRECT_EXTRACT',
          confidence: 0.65,
          reasoning: 'Directly in text, but triggers physical rule validation failure against NBR material properties.'
        }
      },
      {
        key: 'seal_material',
        label: 'Seat & Seal Material',
        category: 'Materials',
        rawValue: 'NBR',
        normalizedValue: 'NBR (Nitrile Butadiene Rubber)',
        unit: 'elastomer',
        isKeyCommerceFilter: true,
        status: 'warning',
        warningMessage: 'Elastomer mismatch with 300°C steam application.'
      }
    ],
    standardsCertifications: ['ASME B16.34 Class 600', 'API 6D', 'API 607 Fire Safe'],
    complianceDetails: {
      rohs: true,
      reach: true,
      ce: true
    },
    crossReferences: [],
    accessoriesAndSpares: [],
    validationIssues: [
      {
        id: 'val-001',
        severity: 'error',
        field: 'max_temperature / seal_material',
        message: 'Material Thermal Incompatibility: NBR seals cannot withstand claimed 300°C operating temperature (NBR limit is 100°C). Suggest upgrading seat to PEEK or Stellite metal seats for 300°C steam service.',
        suggestedFix: 'Change seal_material to "Carbon-filled PEEK" or restrict max_temperature to 100°C.',
        autoFixAvailable: true
      },
      {
        id: 'val-002',
        severity: 'warning',
        field: 'cadModelAvailable',
        message: 'Missing 3D CAD STEP model for high-value Class 600 industrial assembly.',
        suggestedFix: 'Request CAD model from supplier portal.'
      }
    ],
    auditTrail: [
      {
        attributeKey: 'PHYSICAL_CONSISTENCY_CHECK',
        evidenceType: 'INDUSTRY_STANDARD_DEFAULT',
        confidence: 0.99,
        reasoning: 'Rule Engine ASTM D2000 triggered: NBR nitrile continuous temperature maximum exceeded.'
      }
    ]
  }
];

export const SAMPLE_INPUT_PRESETS = [
  {
    title: 'Parker Pneumatic Cylinder (Raw Model Code)',
    sector: 'Fluid Power & Pneumatics' as const,
    sourceType: 'RAW_TEXT' as const,
    rawText: `Parker P1D-S050MS-0100
ISO 15552 profile cylinder, 50mm bore, 100mm stroke
Max pressure 10 bar (145 psi), port size G 1/4
Polyurethane & NBR seals, magnetic piston, stainless rod
Operating temp: -20°C to +80°C
Conforms to DIN ISO 6431 and VDMA 24562`
  },
  {
    title: 'Grundfos CR Vertical Pump (Incomplete Distributor Snippet)',
    sector: 'Pumps & Fluid Handling' as const,
    sourceType: 'RAW_TEXT' as const,
    rawText: `CR 3-15 A-A-A-E-HQQE Grundfos Multistage Pump
Flow Q=3 m3/hr, Head H=75m max
Motor: 1.5 kW (2 HP), 3x400V 50Hz IE3 premium
Oval flange PN25, liquid temp up to 120 C
Silicon carbide shaft seal cartridge HQQE`
  },
  {
    title: 'Siemens SINAMICS Inverter (Spec Sheet OCR Dump)',
    sector: 'Motors & Automation Drives' as const,
    sourceType: 'OCR_NAMEPLATE' as const,
    rawText: `SIEMENS SINAMICS G120C
MLFB: 6SL3210-1KE18-8UF1
Input: 3AC 380-480V 50/60Hz 11.5A
Output: 3AC 0-Input V 0-550Hz 8.8A 4.0kW / 5.0HP HD
Comm: PROFINET / EtherNet/IP (Dual Port RJ45)
Safety: STO integrated SIL3 / Cat 4 PL e
Frame Size FSB, IP20, Braking chopper built-in`
  },
  {
    title: 'Flowserve / Emerson High-Pressure Steam Valve (Needs Validation)',
    sector: 'Process Valves & Actuation' as const,
    sourceType: 'RAW_TEXT' as const,
    rawText: `Flowserve Series 51 2-inch Class 300 Flanged Ball Valve
316SS Body & Trim, full port 50mm, PTFE seats
Rated for 250 deg C continuous steam, 50 bar max
Face-to-face ASME B16.10, Fire Safe to API 607 6th Ed
ISO 5211 direct mounting pad for pneumatic actuator`
  },
  {
    title: 'Endress+Hauser Electromagnetic Flowmeter (Industrial Nameplate)',
    sector: 'Sensors & Industrial IoT' as const,
    sourceType: 'OCR_NAMEPLATE' as const,
    rawText: `E+H Promag 10P DN50 2"
Order Code: 10P50-AA0A1AA0A4AA
Measuring range: 0.1 to 9.6 l/s (0.5 to 35 m3/h)
Liner: PTFE, Electrodes: Alloy C22
Process Conn: EN 1092-1 DN50 PN40
Output: 4-20mA HART, Passive pulse/frequency
Temp medium: -40 to +180 °C, Max pressure 40 bar`
  }
];
