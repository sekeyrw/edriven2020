function mainForm(){
    var subtotal, tax, total, amountPaid, change, percentToGet, pay;
    pay = document.getElementById("pay")
    percentToGet = 12;
    subtotal = document.getElementById("subtotal").value;
    tax = Number((percentToGet / 100) * subtotal);
    total =  Number(subtotal) + Number(tax);

    amountPaid = Number(total);  
    change = Number(amountPaid-total);

    if(subtotal > 99){
        document.getElementById("tax").value = tax.toFixed(2);
        document.getElementById("total").value = total.toFixed(2);
        document.getElementById("amountpaid").value = amountPaid.toFixed(2);
        document.getElementById("amountpaid").disabled = false;
        document.getElementById("amountpaid").min = total.toFixed(2);
        document.getElementById("change").value = change.toFixed(2);
        pay.style.backgroundColor = "#5de95d";
        pay.disabled = false;
    }
    else{
        document.getElementById("tax").value = "";
        document.getElementById("total").value = "";
        document.getElementById("amountpaid").value = "";
        document.getElementById("amountpaid").disabled = true;
        document.getElementById("amountpaid").min = "";
        document.getElementById("change").value = "";
        pay.style.backgroundColor = "#ff0000";
        pay.disabled = true;
    }
};

function changeVal(){
    var subtotal, tax, total, amountPaid, change;
    subtotal = document.getElementById("subtotal").value;
    tax = document.getElementById("tax").value
    total =  document.getElementById("total").value

    amountPaid = document.getElementById("amountpaid").value 
    change = Number(amountPaid-total);

    document.getElementById("change").value = change.toFixed(2);

        if(change > "-1"){
            pay.style.backgroundColor = "#5de95d";
            pay.disabled = false;
        }
        else{
            pay.style.backgroundColor = "#ff0000";
            pay.disabled = true;
        }
};