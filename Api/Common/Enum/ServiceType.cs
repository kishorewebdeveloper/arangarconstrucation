using System.ComponentModel;

namespace Common.Enum
{
    public enum ServiceType : byte
    {
        [Description("CMDA Approved Flats")]
        CMDAApprovedFlats = 1,

        [Description("Ready to Occupy Flats")]
        ReadytoOccupyFlats = 2,

        [Description("Luxury Villas")]
        LuxuryVillas = 3,

        [Description("Join Ventures")]
        JoinVentures = 4,
        
        [Description("Construction")]
        Construction = 5,
    }
}
