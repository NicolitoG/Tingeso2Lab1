package Tingeso.Backend.DTOs;

public class BoletaDTO {
    private String clientName;
    private double baseTariff;
    private double groupDiscount;
    private double specialDiscount;
    private double finalAmountBeforeIVA;
    private double ivaValue;
    private double totalAmountWithIVA;

    // Getters y setters
    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public double getBaseTariff() {
        return baseTariff;
    }

    public void setBaseTariff(double baseTariff) {
        this.baseTariff = baseTariff;
    }

    public double getGroupDiscount() {
        return groupDiscount;
    }

    public void setGroupDiscount(double groupDiscount) {
        this.groupDiscount = groupDiscount;
    }

    public double getSpecialDiscount() {
        return specialDiscount;
    }

    public void setSpecialDiscount(double specialDiscount) {
        this.specialDiscount = specialDiscount;
    }

    public double getFinalAmountBeforeIVA() {
        return finalAmountBeforeIVA;
    }

    public void setFinalAmountBeforeIVA(double finalAmountBeforeIVA) {
        this.finalAmountBeforeIVA = finalAmountBeforeIVA;
    }

    public double getIvaValue() {
        return ivaValue;
    }

    public void setIvaValue(double ivaValue) {
        this.ivaValue = ivaValue;
    }

    public double getTotalAmountWithIVA() {
        return totalAmountWithIVA;
    }

    public void setTotalAmountWithIVA(double totalAmountWithIVA) {
        this.totalAmountWithIVA = totalAmountWithIVA;
    }
}
