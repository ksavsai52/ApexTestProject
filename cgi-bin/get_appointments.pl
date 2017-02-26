#!C:\xampp\perl\bin\perl.exe
use strict;
use warnings;
 
use DBI;
use JSON;
use CGI;
my $q = CGI->new();
my $search = $q->param('search');

print qq(Content-type: Application/JSON\n\n);
 
my $dbfile = "db_appointment.sqlite";
 
my $dsn      = "dbi:SQLite:dbname=$dbfile";
my $user     = "";
my $password = "";
my $dbh = DBI->connect($dsn, $user, $password, {
   PrintError       => 0,
   RaiseError       => 1,
   AutoCommit       => 1,
   FetchHashKeyName => 'NAME_lc',
});
 
my $sql = 'SELECT datetime, description FROM appointments where description LIKE "' . $search . '%"';
my $sth = $dbh->prepare($sql);
 
$sth->execute();
my @appointments;
while (my $row = $sth->fetchrow_hashref) {
   my @datetime = split /#/, $row->{datetime};
   my $appointment = '{ "date" : ' . '"' . $datetime[0] . '" , "time" : ' . '"' . $datetime[1] . '" , "description" : ' . '"' . $row->{description} . '" }';
   push @appointments, $appointment;
}
my $json_str = encode_json(\@appointments);
print $json_str;
 
$dbh->disconnect;